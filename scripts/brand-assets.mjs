/**
 * Generates the LeksIDE brand files from the traced vector + master artwork.
 * Re-run with `npm run brand` after changing the logo.
 */
import sharp from 'sharp';
import { writeFile, readFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const brand = resolve(root, 'public/brand');
await mkdir(brand, { recursive: true });

const MASTER = process.env.LEKSIDE_MASTER
  || 'C:/Users/HP/Downloads/LeksIDE Tech Logo on Dark Canvas.png';

const GOLD = '#FFB400';
const CHEVRON_DARK_BG = '#F0EFED';
const CHEVRON_LIGHT_BG = '#0A0E1A';

// Read the traced geometry straight out of the committed module, so the SVG
// files and the React component can never drift apart.
const marks = await readFile(resolve(root, 'src/components/brand/markPaths.ts'), 'utf-8');
const grab = (name) => {
  const m = marks.match(new RegExp(name + String.raw` =\s*'([\s\S]*?)';`));
  if (!m) throw new Error(`Could not read ${name} from markPaths.ts`);
  return m[1].replace(/\'/g, "'");
};
const GOLD_PATH = grab('GOLD_PATH');
const CHEVRON_PATH = grab('CHEVRON_PATH');
const VB_W = 314, VB_H = 335;

const markSvg = (chevron) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}" width="${VB_W}" height="${VB_H}" role="img" aria-label="LeksIDE">
  <path d="${GOLD_PATH}" fill="${GOLD}"/>
  <path d="${CHEVRON_PATH}" fill="${chevron}"/>
</svg>
`;

const lockupSvg = (chevron, word, desc) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 130" width="560" height="130" role="img" aria-label="LeksIDE — Technology Studio">
  <g transform="translate(8,22) scale(0.257)">
    <path d="${GOLD_PATH}" fill="${GOLD}"/>
    <path d="${CHEVRON_PATH}" fill="${chevron}"/>
  </g>
  <text x="110" y="76" font-family="Poppins,'Space Grotesk',Segoe UI,Arial,sans-serif" font-size="68" font-weight="800" letter-spacing="-1.5">
    <tspan fill="${word}">Leks</tspan><tspan fill="${GOLD}">IDE</tspan>
  </text>
  <text x="113" y="104" font-family="'Space Grotesk',Segoe UI,Arial,sans-serif" font-size="17" font-weight="600" letter-spacing="6.2" fill="${desc}">TECHNOLOGY STUDIO</text>
</svg>
`;

await writeFile(resolve(brand, 'leks-ide-mark-on-dark.svg'), markSvg(CHEVRON_DARK_BG));
await writeFile(resolve(brand, 'leks-ide-mark-on-light.svg'), markSvg(CHEVRON_LIGHT_BG));
await writeFile(
  resolve(brand, 'leks-ide-lockup-on-dark.svg'),
  lockupSvg(CHEVRON_DARK_BG, '#FFFFFF', '#A8A8A8')
);
await writeFile(
  resolve(brand, 'leks-ide-lockup-on-light.svg'),
  lockupSvg(CHEVRON_LIGHT_BG, '#0A0E1A', '#4A5568')
);

// Favicon: the mark alone, on the brand's dark tile so it stays legible in
// both a light and a dark browser chrome.
await writeFile(
  resolve(root, 'public/favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-48 -40 410 415" width="512" height="512">
  <rect x="-48" y="-40" width="410" height="415" rx="72" fill="#111111"/>
  <path d="${GOLD_PATH}" fill="${GOLD}"/>
  <path d="${CHEVRON_PATH}" fill="${CHEVRON_DARK_BG}"/>
</svg>
`
);

// Optimised copy of the supplied artwork, trimmed of its dead canvas.
try {
  await sharp(MASTER)
    .trim({ threshold: 18 })
    .resize({ width: 900, withoutEnlargement: true })
    .png({ quality: 86, compressionLevel: 9 })
    .toFile(resolve(brand, 'leks-ide-logo-master.png'));

  // Social sharing card: the lockup centred on the brand's near-black.
  const logo = await sharp(MASTER)
    .trim({ threshold: 18 })
    .resize({ width: 620, fit: 'inside' })
    .png()
    .toBuffer();

  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: '#0c0c0d' },
  })
    .composite([{ input: logo, gravity: 'centre' }])
    .jpeg({ quality: 88 })
    .toFile(resolve(root, 'public/og-image.jpg'));
  console.log('brand assets + og-image generated');
} catch (err) {
  console.warn('Master artwork not processed:', err.message);
  console.warn('SVG brand files were still written.');
}
