/**
 * Génère depuis des SVG sources les icônes raster (favicon PNG, apple-touch-icon, icônes de
 * manifest) et l'image de partage Open Graph, avec l'identité visuelle du site
 * (Navy / Electric Blue / Cyan / Gold), sans dépendance à une police externe.
 *
 *   npm run generate:social
 */
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const PUBLIC = fileURLToPath(new URL('../public/', import.meta.url))

const NAVY = '#050B14'
const NAVY_2 = '#081426'
const ELECTRIC = '#1677FF'
const CYAN = '#00D9FF'
const GOLD = '#C9A25C'
const INK = '#F5F7FA'

/** Même tracé que public/favicon.svg (badge « MS »), à une taille de canevas donnée. */
function badgeSvg(size) {
  const r = size * (14 / 64)
  const stroke = size * (2 / 64)
  const fontSize = size * (26 / 64)
  const dotR = size * (4 / 64)
  const dotCx = size * (50 / 64)
  const dotCy = size * (14 / 64)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${r}" fill="${NAVY}"/>
    <rect x="1" y="1" width="${size - 2}" height="${size - 2}" rx="${r - 1}" fill="none" stroke="${ELECTRIC}" stroke-opacity=".5" stroke-width="${stroke}"/>
    <text x="${size / 2}" y="${size * 0.65}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="${fontSize}" fill="${INK}">MS</text>
    <circle cx="${dotCx}" cy="${dotCy}" r="${dotR}" fill="${CYAN}"/>
  </svg>`
}

const favicons = [
  { file: 'favicon-32.png', size: 32 },
  { file: 'favicon-192.png', size: 192 },
  { file: 'favicon-512.png', size: 512 },
  { file: 'apple-touch-icon.png', size: 180 },
]

for (const { file, size } of favicons) {
  await sharp(Buffer.from(badgeSvg(size))).png().toFile(`${PUBLIC}${file}`)
  console.log(`${file}: ${size}×${size}`)
}

/**
 * Image de partage Open Graph / Twitter Card (1200×630) : fond Navy, quelques repères réseau
 * discrets, badge « MS », nom, positionnement, signature. Texte en polices système (comme le
 * favicon) pour un rendu fiable sans police embarquée.
 */
const OG_WIDTH = 1200
const OG_HEIGHT = 630
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${NAVY}"/>
      <stop offset="1" stop-color="${NAVY_2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="82%" cy="14%" r="60%">
      <stop offset="0" stop-color="${ELECTRIC}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${ELECTRIC}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#bg)"/>
  <rect width="${OG_WIDTH}" height="${OG_HEIGHT}" fill="url(#glow)"/>

  <!-- Repères réseau discrets : nœuds reliés, rappel de l'identité "network / cyber" du site. -->
  <g stroke="${ELECTRIC}" stroke-opacity="0.35" stroke-width="1.5">
    <line x1="760" y1="120" x2="900" y2="90"/>
    <line x1="900" y1="90" x2="1040" y2="150"/>
    <line x1="900" y1="90" x2="960" y2="220"/>
    <line x1="1040" y1="150" x2="1120" y2="260"/>
  </g>
  <g fill="${CYAN}">
    <circle cx="760" cy="120" r="3.5"/>
    <circle cx="900" cy="90" r="4.5"/>
    <circle cx="1040" cy="150" r="3.5"/>
    <circle cx="960" cy="220" r="3"/>
    <circle cx="1120" cy="260" r="3"/>
  </g>

  <!-- Badge -->
  <g transform="translate(96, 96)">
    <rect width="72" height="72" rx="16" fill="${NAVY}"/>
    <rect x="1" y="1" width="70" height="70" rx="15" fill="none" stroke="${ELECTRIC}" stroke-opacity=".6" stroke-width="2"/>
    <text x="36" y="47" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="29" fill="${INK}">MS</text>
    <circle cx="56" cy="16" r="4.5" fill="${CYAN}"/>
  </g>

  <text x="96" y="272" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="66" fill="${INK}">Mamadou Sarr</text>
  <text x="99" y="322" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="28" fill="${CYAN}">Cybersecurity · Cloud · Data Engineering</text>
  <text x="99" y="360" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="28" fill="${CYAN}">Big Data · Artificial Intelligence</text>

  <rect x="99" y="404" width="46" height="3" fill="${GOLD}"/>
  <text x="99" y="440" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="22" fill="${GOLD}">Digital Transformation · Sénégal</text>
</svg>`

await sharp(Buffer.from(ogSvg)).png().toFile(`${PUBLIC}og-image.png`)
console.log(`og-image.png: ${OG_WIDTH}×${OG_HEIGHT}`)

/** Manifest minimal : identité du site, pas une PWA installable à part entière. */
const manifest = {
  name: 'Mamadou Sarr — Cybersecurity · Cloud · Data Engineering · Big Data · AI',
  short_name: 'Mamadou Sarr',
  description: 'Cybersecurity, Cloud, Data Engineering, Big Data, IA et transformation numérique.',
  start_url: '/',
  scope: '/',
  display: 'browser',
  lang: 'fr',
  background_color: NAVY,
  theme_color: NAVY,
  icons: [
    { src: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
  ],
}
await writeFile(`${PUBLIC}manifest.webmanifest`, JSON.stringify(manifest, null, 2) + '\n')
console.log('manifest.webmanifest')
