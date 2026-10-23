import sharp from 'sharp';
import potrace from 'potrace';
import { promisify } from 'node:util';
import { writeFile } from 'node:fs/promises';

/**
 * Re-traces the LeksIDE mark from the master artwork into
 * `src/components/brand/markPaths.ts`. Only needs running if the logo
 * artwork changes; the generated module is committed.
 *
 * Usage: LEKSIDE_MASTER="/path/to/logo.png" node scripts/trace-logo.mjs
 */

const trace = promisify(potrace.trace);
const SRC = process.env.LEKSIDE_MASTER
  || 'C:/Users/HP/Downloads/LeksIDE Tech Logo on Dark Canvas.png';

// Mark region measured earlier: x 470..783, y 311..645
const LEFT = 470, TOP = 311, W = 314, H = 335;

const { data, info } = await sharp(SRC)
  .extract({ left: LEFT, top: TOP, width: W, height: H })
  .raw()
  .toBuffer({ resolveWithObject: true });
const ch = info.channels;

// Two masks: gold pixels, and light/chevron pixels. Black-on-white, because
// potrace traces the dark areas.
const gold = Buffer.alloc(W * H, 255);
const chev = Buffer.alloc(W * H, 255);
for (let i = 0, p = 0; p < W * H; p++, i += ch) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const lum = (r + g + b) / 3;
  if (lum <= 70) continue;
  if (r > 140 && b < 140 && r - b > 60) gold[p] = 0;
  else chev[p] = 0;
}

const toSvgPath = async (mask, name) => {
  const png = await sharp(mask, { raw: { width: W, height: H, channels: 1 } })
    .png()
    .toBuffer();
  const svg = await trace(png, { threshold: 128, turdSize: 60, optCurve: true, alphaMax: 0.4 });
  const d = [...svg.matchAll(/ d="([^"]+)"/g)].map((m) => m[1]).join(' ');
  console.log(name, 'path chars:', d.length);
  return d;
};

const goldPath = await toSvgPath(gold, 'gold');
const chevPath = await toSvgPath(chev, 'chevron');
const esc = (d) => d.replace(/'/g, "\'");
await writeFile(
  'src/components/brand/markPaths.ts',
  `/**
 * LeksIDE mark geometry.
 *
 * Auto-traced from the master brand artwork with potrace (see
 * \`scripts/trace-logo.mjs\`) rather than redrawn by hand, so the outline
 * matches the original exactly. Regenerate only if the artwork changes.
 *
 * Coordinate space: ${W} x ${H}.
 */
export const MARK_VIEWBOX = '0 0 ${W} ${H}';
export const MARK_WIDTH = ${W};
export const MARK_HEIGHT = ${H};

/** The gold angular "L" with its arrowhead foot. */
export const GOLD_PATH =
  '${esc(goldPath)}';

/** The heavy chevron that sits to its right. */
export const CHEVRON_PATH =
  '${esc(chevPath)}';
`
);
console.log('written src/components/brand/markPaths.ts');
