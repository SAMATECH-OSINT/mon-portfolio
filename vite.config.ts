import { readFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/** Lit `champ: 'texte'` (ou `null` si `champ: TODO`) dans un fichier source, sans importer le module TS depuis la config Vite. */
function readField(source: string, field: string): string | null {
  const match = source.match(new RegExp(`\\b${field}:\\s*'([^']+)'`))
  return match?.[1] ?? null
}

/** Lit `href: '...'` dans l'entrée `{ id: '<id>', … }` d'un tableau `Social[]` (voir `src/data/socials.ts`). */
function readSocialHref(source: string, id: 'linkedin' | 'github'): string | null {
  const match = source.match(new RegExp(`id:\\s*'${id}'[^}]*?href:\\s*'([^']+)'`))
  return match?.[1] ?? null
}

/**
 * Complète `index.html` avec les balises qui dépendent de l'URL publique du site (canonical,
 * Open Graph, Twitter Card, JSON-LD) et des réseaux validés (LinkedIn, GitHub).
 *
 * Tant que `profile.siteUrl` vaut `TODO` (domaine non choisi), les balises absolues sont
 * omises plutôt que de publier un domaine inventé : seules celles indépendantes du domaine
 * restent actives (robots, image OG en chemin relatif). Une fois `profile.siteUrl` renseigné,
 * un nouveau build les ajoute automatiquement — voir README.md « Domaine personnalisé ».
 */
function seoHead(): Plugin {
  return {
    name: 'seo-head',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        const root = fileURLToPath(new URL('.', import.meta.url))
        const profile = readFileSync(`${root}src/data/profile.ts`, 'utf8')
        const socials = readFileSync(`${root}src/data/socials.ts`, 'utf8')

        const siteUrl = readField(profile, 'siteUrl')?.replace(/\/$/, '') ?? null
        const linkedin = readSocialHref(socials, 'linkedin')
        const github = readSocialHref(socials, 'github')
        const sameAs = [linkedin, github].filter((url): url is string => Boolean(url))

        const person = {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Mamadou Sarr',
          jobTitle: 'Cybersecurity & Data Engineer',
          description:
            'Cybersecurity, Cloud, Data Engineering, Big Data, Intelligence Artificielle et transformation numérique.',
          address: { '@type': 'PostalAddress', addressLocality: 'Thiès', addressCountry: 'SN' },
          ...(siteUrl ? { url: siteUrl, image: `${siteUrl}/og-image.png` } : {}),
          ...(sameAs.length > 0 ? { sameAs } : {}),
        }

        const tags = [
          '<meta name="robots" content="index, follow" />',
          siteUrl ? `<link rel="canonical" href="${siteUrl}/" />` : null,
          siteUrl ? `<meta property="og:url" content="${siteUrl}/" />` : null,
          `<meta property="og:image" content="${siteUrl ?? ''}/og-image.png" />`,
          '<meta property="og:image:width" content="1200" />',
          '<meta property="og:image:height" content="630" />',
          '<meta name="twitter:card" content="summary_large_image" />',
          '<meta name="twitter:title" content="Mamadou Sarr — Cybersecurity · Cloud · Data Engineering · Big Data · AI" />',
          '<meta name="twitter:description" content="Systèmes numériques sécurisés, architectures Cloud et Data, solutions intelligentes : transformer les données en décisions." />',
          `<meta name="twitter:image" content="${siteUrl ?? ''}/og-image.png" />`,
          '<link rel="manifest" href="/manifest.webmanifest" />',
          '<link rel="apple-touch-icon" href="/apple-touch-icon.png" />',
          `<script type="application/ld+json">${JSON.stringify(person)}</script>`,
        ].filter((tag): tag is string => Boolean(tag))

        return html.replace('</head>', `${tags.map((t) => `    ${t}`).join('\n')}\n  </head>`)
      },
    },
  }
}

/** Précharge les deux polices du contenu visible d'emblée (Inter et Space Grotesk, latin). */
function preloadCriticalFonts(): Plugin {
  return {
    name: 'preload-critical-fonts',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        if (!ctx.bundle) return
        return Object.keys(ctx.bundle)
          .filter((file) => /(?:inter|space-grotesk)-latin-wght-normal.*\.woff2$/.test(file))
          .map((file) => ({
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: `/${file}` },
            injectTo: 'head' as const,
          }))
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), preloadCriticalFonts(), seoHead()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    // Le chunk du globe (Three.js, ~134 kB gzip) est chargé en différé et jamais sur mobile.
    chunkSizeWarningLimit: 600,
  },
})
