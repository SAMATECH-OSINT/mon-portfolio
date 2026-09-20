/**
 * Génère public/sitemap.xml et ajoute la ligne Sitemap à public/robots.txt, à partir de
 * `profile.siteUrl` (src/data/profile.ts). Le site n'ayant qu'une page, le sitemap ne
 * contient qu'une seule URL (la racine).
 *
 * À lancer une fois le domaine définitif choisi et `profile.siteUrl` renseigné :
 *
 *   npm run generate:sitemap
 */
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('../', import.meta.url))
const profile = await readFile(`${ROOT}src/data/profile.ts`, 'utf8')
const match = profile.match(/siteUrl:\s*'([^']+)'/)

if (!match) {
  console.error(
    "profile.siteUrl vaut encore TODO dans src/data/profile.ts : renseignez l'URL définitive du site avant de générer le sitemap.",
  )
  process.exit(1)
}

const siteUrl = match[1].replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`
await writeFile(`${ROOT}public/sitemap.xml`, sitemap)
console.log(`public/sitemap.xml → ${siteUrl}/`)

const robotsPath = `${ROOT}public/robots.txt`
const robots = await readFile(robotsPath, 'utf8')
const sitemapLine = `Sitemap: ${siteUrl}/sitemap.xml`
const updated = /^Sitemap:/m.test(robots)
  ? robots.replace(/^Sitemap:.*$/m, sitemapLine)
  : `${robots.replace(/\n*# Sitemap.*$/m, '').trimEnd()}\n\n${sitemapLine}\n`
await writeFile(robotsPath, updated)
console.log(`public/robots.txt → ${sitemapLine}`)
