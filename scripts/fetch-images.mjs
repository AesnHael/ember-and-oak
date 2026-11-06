// Downloads the curated Unsplash photos, compresses them and converts to .webp.
// Usage: node scripts/fetch-images.mjs [rawDownloadDir]
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'src', 'assets', 'images');
const publicDir = path.join(root, 'public');
const rawDir = path.resolve(process.argv[2] ?? path.join(os.tmpdir(), 'ember-oak-raw'));

// name -> [unsplash image id, max width]
const photos = {
  hero: ['1511537190424-bbbab87ac5eb', 2400],
  barista: ['1579265898841-79c7890d69cf', 1400],
  espresso: ['1609050471053-8636409f9f5b', 1100],
  cappuccino: ['1502462041640-b3d7e50d0662', 1100],
  cortado: ['1534778101976-62847782c213', 1100],
  coldbrew: ['1461023058943-07fcbe16d735', 1100],
  chemex: ['1442512595331-e89e73853f31', 1100],
  matcha: ['1717603545758-88cc454db69b', 1100],
  mocha: ['1618576230663-9714aecfb99a', 1100],
  croissant: ['1555507036-ab1f4038808a', 1100],
  almond: ['1612366747681-e4ca6992b1e9', 1100],
  roasting: ['1607681034540-2c46cc71896d', 1600],
  beans: ['1615486825258-2c6e2cd58cb7', 1200],
  hands: ['1501603655206-f464e74bdd1e', 1400],
  interior: ['1565650839149-2c48a094196c', 1600],
};

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(rawDir, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

async function download(id, file) {
  if (fs.existsSync(file)) return;
  const url = `https://images.unsplash.com/photo-${id}?w=2600&q=90&fm=jpg`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${id}: HTTP ${res.status}`);
  fs.writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}

await Promise.all(
  Object.entries(photos).map(async ([name, [id, width]]) => {
    const raw = path.join(rawDir, `${name}.jpg`);
    await download(id, raw);
    const meta = await sharp(raw).metadata();
    const out = path.join(outDir, `${name}.webp`);
    await sharp(raw).resize({ width, withoutEnlargement: true }).webp({ quality: name === 'beans' ? 60 : 72, effort: 6 }).toFile(out);
    if (name === 'hero') {
      await sharp(raw).resize({ width: 1100 }).webp({ quality: 70, effort: 6 }).toFile(path.join(outDir, 'hero-sm.webp'));
      await sharp(raw).resize(1200, 630, { fit: 'cover' }).modulate({ brightness: 0.85 }).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(publicDir, 'og-image.jpg'));
    }
    const kb = (fs.statSync(out).size / 1024).toFixed(0);
    console.log(`${name.padEnd(11)} ${meta.width}x${meta.height} -> ${kb} KB`);
  }),
);
console.log('Done. Raw files in', rawDir);
