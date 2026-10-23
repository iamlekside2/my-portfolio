/**
 * Converts the project screenshots to WebP.
 *
 * These are the heaviest thing the site ships: 27 full-page PNG screenshots,
 * several over 600 KB each. WebP at quality 78 is visually indistinguishable
 * at tile size and roughly an order of magnitude smaller.
 *
 * Run with `npm run images` after adding a new screenshot.
 */
import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import { resolve, dirname, join, basename, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dir = resolve(root, 'src/assets/projects');

const files = (await readdir(dir)).filter((f) => extname(f).toLowerCase() === '.png');
let before = 0;
let after = 0;

for (const file of files) {
  const src = join(dir, file);
  const out = join(dir, `${basename(file, extname(file))}.webp`);
  before += (await stat(src)).size;

  // Tiles render at most ~680px wide on a 2x display; anything beyond that is
  // detail nobody sees.
  await sharp(src)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 78, effort: 5 })
    .toFile(out);

  after += (await stat(out)).size;
  await unlink(src);
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(2)} MB`;
console.log(`${files.length} screenshots: ${mb(before)} -> ${mb(after)}`);
