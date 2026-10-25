/**
 * Static server for `dist/`, matching how Vercel serves this site.
 *
 * `vite preview` does not. It looks for a file literally named `contact`,
 * does not find one, and falls back to `index.html` — so every route returns
 * the home page. The app then hydrates the route's component tree against
 * home markup and React throws a hydration mismatch on every page. That is
 * an artefact of the server, not of the build, and it makes `npm run preview`
 * useless for checking prerendered output: the one thing it is needed for.
 *
 * The rules below are read from `vercel.json` rather than copied, so the two
 * cannot drift apart. Anything this server gets wrong is a bug in the server,
 * not a difference of opinion with production.
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, relative, sep } from "node:path";

const root = resolve(process.cwd(), "dist");
const config = JSON.parse(
  await readFile(resolve(process.cwd(), "vercel.json"), "utf-8")
);
const cleanUrls = config.cleanUrls === true;
const trailingSlash = config.trailingSlash === true;

const args = process.argv.slice(2);
const portArg = args.indexOf("--port");
const port = Number(portArg >= 0 ? args[portArg + 1] : 0) || 4173;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".bin": "application/octet-stream",
  ".map": "application/json; charset=utf-8",
};

/** Reads a file only if it is a real file inside `dist`. */
const readIfFile = async (path) => {
  // `relative` going upward means the path escaped the root, which is how a
  // request like `/../../etc/passwd` would otherwise be served.
  const rel = relative(root, path);
  if (rel.startsWith("..") || rel.startsWith(sep + "..")) return null;
  try {
    if (!(await stat(path)).isFile()) return null;
    return await readFile(path);
  } catch {
    return null;
  }
};

const redirect = (res, location) => {
  // 308 rather than 301: it keeps the method, and it is what Vercel sends for
  // these normalisations, so a redirect loop here is a redirect loop there.
  res.writeHead(308, { Location: location });
  res.end();
};

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${port}`);
  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch {
    res.writeHead(400).end("Bad request");
    return;
  }

  // trailingSlash: false — `/contact/` is not a second URL for the same page,
  // it redirects. Worth matching: the router has no route with a trailing
  // slash, so serving it directly would render the 404 page under the right
  // markup, which is its own confusing bug.
  if (!trailingSlash && pathname.length > 1 && pathname.endsWith("/")) {
    redirect(res, pathname.slice(0, -1) + url.search);
    return;
  }

  // cleanUrls — the `.html` form of a page redirects to the extensionless one.
  if (cleanUrls && pathname.endsWith(".html")) {
    const stripped = pathname.replace(/(\/index)?\.html$/, "");
    redirect(res, (stripped || "/") + url.search);
    return;
  }

  const send = (body, status, ext) => {
    res.writeHead(status, {
      "Content-Type": TYPES[ext] ?? "application/octet-stream",
      "Content-Length": body.length,
    });
    res.end(req.method === "HEAD" ? undefined : body);
  };

  // Assets first, then the two shapes the prerender writes: `/about` is on
  // disk as `about/index.html`, and the root is `index.html`.
  const candidates = extname(pathname)
    ? [[resolve(root, "." + pathname), extname(pathname)]]
    : [
        [resolve(root, "." + pathname, "index.html"), ".html"],
        [resolve(root, "." + pathname + ".html"), ".html"],
      ];

  for (const [path, ext] of candidates) {
    const body = await readIfFile(path);
    if (body) {
      send(body, 200, ext);
      return;
    }
  }

  // Unmatched routes get the prerendered 404 page with a 404 status, which is
  // what Vercel does. Returning index.html with a 200 — the `vite preview`
  // behaviour — is what hid this whole problem.
  const notFound = await readIfFile(resolve(root, "404.html"));
  if (notFound) {
    send(notFound, 404, ".html");
    return;
  }
  send(Buffer.from("Not found"), 404, ".txt");
});

server.listen(port, () => {
  console.log(`  dist/ served at http://localhost:${port}`);
  console.log(
    `  cleanUrls: ${cleanUrls}  trailingSlash: ${trailingSlash}  (from vercel.json)`
  );
});
