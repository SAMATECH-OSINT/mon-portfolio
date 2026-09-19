/**
 * Génère src/assets/globeLand.ts : masque terrestre basse résolution pour le globe du Hero.
 * Source : Natural Earth 1:110m (domaine public) — https://www.naturalearthdata.com
 *
 *   node scripts/generate-globe-data.mjs
 *
 * Classes : 0 mer · 1 terre · 2 Afrique · 3 Sénégal
 */
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const SOURCE =
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
const STEP = 2
const COLS = 360 / STEP
const ROWS = 180 / STEP

const geojson = await (await fetch(SOURCE)).json()

const countries = geojson.features
  .filter((f) => f.properties.CONTINENT !== 'Antarctica')
  .map((f) => {
    const polygons = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates
    const lons = polygons.flatMap((p) => p[0].map((c) => c[0]))
    const lats = polygons.flatMap((p) => p[0].map((c) => c[1]))
    return {
      polygons,
      bbox: [Math.min(...lons), Math.min(...lats), Math.max(...lons), Math.max(...lats)],
      cls: f.properties.ADMIN === 'Senegal' ? 3 : f.properties.CONTINENT === 'Africa' ? 2 : 1,
    }
  })

function inRing(lon, lat, ring) {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]
    const [xj, yj] = ring[j]
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside
  }
  return inside
}

const inPolygon = (lon, lat, [outer, ...holes]) =>
  inRing(lon, lat, outer) && !holes.some((h) => inRing(lon, lat, h))

const rows = []
for (let r = 0; r < ROWS; r++) {
  const lat = 90 - STEP * (r + 0.5)
  let row = ''
  for (let c = 0; c < COLS; c++) {
    const lon = -180 + STEP * (c + 0.5)
    let cls = 0
    for (const country of countries) {
      const [x0, y0, x1, y1] = country.bbox
      if (lon < x0 || lon > x1 || lat < y0 || lat > y1) continue
      if (country.polygons.some((p) => inPolygon(lon, lat, p))) {
        cls = Math.max(cls, country.cls)
      }
    }
    row += cls
  }
  rows.push(row)
}

// Encodage par plages : « <classe><longueur>; »
const encoded = rows
  .map((row) => {
    const runs = row.match(/(\d)\1*/g) ?? []
    return runs.map((run) => `${run[0]}${run.length}`).join(';')
  })
  .join('|')

const output = `// Fichier généré par scripts/generate-globe-data.mjs — ne pas modifier à la main.
// Source : Natural Earth 1:110m (domaine public).

export const GLOBE_STEP = ${STEP}
export const GLOBE_COLS = ${COLS}
export const GLOBE_ROWS = ${ROWS}

/** Classes : 0 mer · 1 terre · 2 Afrique · 3 Sénégal. Lignes séparées par « | », plages « classe+longueur ». */
export const GLOBE_MASK =
  '${encoded}'
`

const target = fileURLToPath(new URL('../src/assets/globeLand.ts', import.meta.url))
await writeFile(target, output)
console.log(`written ${target} (${encoded.length} chars)`)
