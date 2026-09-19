import { cn } from '@/lib/cn'

interface ImageMeta {
  width: number
  height: number
  widths: number[]
}

/** Variantes générées par `npm run optimize:images` (hachées et servies par Vite). */
const urls = import.meta.glob<string>('/src/assets/images/*.{avif,webp,jpg}', {
  eager: true,
  query: '?url',
  import: 'default',
})
const metas = import.meta.glob<ImageMeta>('/src/assets/images/*.json', { eager: true, import: 'default' })

const FORMATS = [
  { ext: 'avif', type: 'image/avif' },
  { ext: 'webp', type: 'image/webp' },
] as const

function srcSet(name: string, ext: string, widths: number[]): string {
  return widths
    .map((w) => [urls[`/src/assets/images/${name}-${w}w.${ext}`], w] as const)
    .filter((entry): entry is readonly [string, number] => entry[0] !== undefined)
    .map(([url, w]) => `${url} ${w}w`)
    .join(', ')
}

interface ResponsiveImageProps {
  /** Nom de l'image source (assets-src/<name>.jpg). */
  name: string
  alt: string
  /** Largeur d'affichage selon le viewport, ex. `(min-width: 1024px) 384px, 90vw`. */
  sizes: string
  /** Image au-dessus de la ligne de flottaison : chargement immédiat et prioritaire. */
  priority?: boolean
  className?: string
}

/**
 * <picture> AVIF → WebP → JPEG avec dimensions intrinsèques (aucun décalage de mise en page).
 * Renvoie `null` si l'image n'a pas été générée.
 */
export function ResponsiveImage({ name, alt, sizes, priority = false, className }: ResponsiveImageProps) {
  const meta = metas[`/src/assets/images/${name}.json`]
  if (!meta) return null

  const fallback = urls[`/src/assets/images/${name}-${meta.width}w.jpg`]
  return (
    <picture className="contents">
      {FORMATS.map(({ ext, type }) => (
        <source key={ext} type={type} srcSet={srcSet(name, ext, meta.widths)} sizes={sizes} />
      ))}
      <img
        src={fallback}
        srcSet={srcSet(name, 'jpg', meta.widths)}
        sizes={sizes}
        alt={alt}
        width={meta.width}
        height={meta.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        {...(priority ? { fetchPriority: 'high' as const } : {})}
        className={cn(className)}
      />
    </picture>
  )
}
