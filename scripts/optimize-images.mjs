/**
 * Optimise les images sources (assets-src/) en variantes responsives AVIF / WebP / JPEG
 * dans src/assets/images/, prêtes pour <ResponsiveImage name="…" />.
 *
 *   npm run optimize:images
 *
 * - Nom du fichier source = nom de l'image (ex. assets-src/portrait.jpg → name="portrait").
 * - Les métadonnées EXIF (dont la géolocalisation) sont supprimées ; l'orientation est appliquée.
 * - Chaque image produit aussi <nom>.json avec ses dimensions, pour réserver l'espace (pas de CLS).
 */
import { mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { basename, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const SOURCE = fileURLToPath(new URL('../assets-src/', import.meta.url))
const OUTPUT = fileURLToPath(new URL('../src/assets/images/', import.meta.url))
const WIDTHS = [320, 480, 640, 960, 1280, 1600, 2000]
const FORMATS = {
  avif: (image) => image.avif({ quality: 55, effort: 6 }),
  webp: (image) => image.webp({ quality: 76 }),
  jpg: (image) => image.jpeg({ quality: 80, mozjpeg: true }),
}

const files = (await readdir(SOURCE)).filter((f) => /\.(jpe?g|png)$/i.test(f))
if (files.length === 0) {
  console.log('Aucune image dans assets-src/')
  process.exit(0)
}

await rm(OUTPUT, { recursive: true, force: true })
await mkdir(OUTPUT, { recursive: true })

for (const file of files) {
  const name = basename(file, extname(file)).toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const base = sharp(join(SOURCE, file)).rotate()
  const { width, height } = await base.clone().toBuffer({ resolveWithObject: true }).then((r) => r.info)

  // Largeurs ≤ original ; l'original lui-même sert de dernière variante.
  const widths = [...new Set([...WIDTHS.filter((w) => w < width), width])]

  for (const w of widths) {
    for (const [ext, encode] of Object.entries(FORMATS)) {
      await encode(base.clone().resize({ width: w, withoutEnlargement: true })).toFile(join(OUTPUT, `${name}-${w}w.${ext}`))
    }
  }
  await writeFile(join(OUTPUT, `${name}.json`), JSON.stringify({ width, height, widths }, null, 2) + '\n')
  console.log(`${name}: ${width}×${height} → ${widths.join(', ')} px × avif/webp/jpg`)
}
