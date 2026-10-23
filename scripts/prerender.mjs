/**
 * Prerenders every route to static HTML.
 *
 * Without this the site ships an empty <div id="root">, so anything that
 * doesn't execute JavaScript — LLM fetchers, link unfurlers, most non-Google
 * crawlers — sees a blank page. Here each route is rendered with
 * react-dom/server at build time and written as real HTML into dist/.
 *
 * Runs after `vite build` (client) and `vite build --ssr`. See the "build"
 * script in package.json.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");

const { render, ROUTE_META, SITE_URL } = await import(
  pathToFileURL(resolve(root, "dist-ssr/entry-server.js")).href
);

const template = await readFile(resolve(dist, "index.html"), "utf-8");

const escapeAttr = (s) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const TITLE_RE = /<title>[\s\S]*?<\/title>/;
const DESC_RE = /<meta\s+name="description"[\s\S]*?\/?>/;
const OG_TITLE_RE = /<meta\s+property="og:title"[\s\S]*?\/?>/;
const OG_DESC_RE = /<meta\s+property="og:description"[\s\S]*?\/?>/;
const OG_URL_RE = /<meta\s+property="og:url"[\s\S]*?\/?>/;
const CANONICAL_RE = /<link\s+rel="canonical"[\s\S]*?\/?>/;

/** Swap the value of an attribute on a head tag that already exists. */
const setTag = (html, pattern, attr, value) =>
  html.replace(pattern, (tag) =>
    tag.replace(new RegExp(`${attr}="[^"]*"`), `${attr}="${escapeAttr(value)}"`)
  );

/**
 * Build one HTML document: route metadata into the head, rendered markup into
 * the root div.
 */
const buildPage = ({ title, description, url, markup, noindex = false }) => {
  let html = template;
  html = html.replace(TITLE_RE, `<title>${escapeAttr(title)}</title>`);
  html = setTag(html, DESC_RE, "content", description);
  html = setTag(html, OG_TITLE_RE, "content", title);
  html = setTag(html, OG_DESC_RE, "content", description);
  if (url) {
    html = setTag(html, OG_URL_RE, "content", url);
    html = setTag(html, CANONICAL_RE, "href", url);
  }
  if (noindex) {
    html = html.replace(
      "</head>",
      `  <meta name="robots" content="noindex" />
  </head>`
    );
  }
  return html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
};

const outPathFor = (route) =>
  route === "/"
    ? resolve(dist, "index.html")
    : resolve(dist, `.${route}/index.html`);

let written = 0;

for (const meta of ROUTE_META) {
  const url = `${SITE_URL}${meta.path}`;
  const markup = render(meta.path);
  const html = buildPage({
    title: meta.title,
    description: meta.description,
    url,
    markup,
  });

  const out = outPathFor(meta.path);
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, html, "utf-8");
  written += 1;
  console.log(
    `  prerendered ${meta.path.padEnd(26)} ${(markup.length / 1024).toFixed(1)} KB`
  );
}

// A standalone 404 document. Vercel serves dist/404.html with a genuine 404
// status for unmatched paths; the old catch-all rewrite returned the homepage
// with a 200, which told crawlers the page existed.
await writeFile(
  resolve(dist, "404.html"),
  buildPage({
    title: "Page not found — LeksIDE",
    description:
      "That page does not exist. Browse the studio’s work and services instead.",
    markup: render("/404-not-found"),
    noindex: true,
  }),
  "utf-8"
);
console.log("  prerendered 404.html");

// Sitemap, generated from the same route list so it cannot drift.
const today = new Date().toISOString().slice(0, 10);
const urls = ROUTE_META.map((m) =>
  [
    "  <url>",
    `    <loc>${SITE_URL}${m.path}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    "    <changefreq>monthly</changefreq>",
    `    <priority>${m.path === "/" ? "1.0" : "0.8"}</priority>`,
    "  </url>",
  ].join("\n")
).join("\n");

await writeFile(
  resolve(dist, "sitemap.xml"),
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n"),
  "utf-8"
);

console.log(`\nPrerendered ${written} route(s) + 404.html + sitemap.xml`);
