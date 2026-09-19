import { useCallback } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Délai en secondes (échelonnage). */
  delay?: number
  /** Décalage vertical initial en px. */
  y?: number
  /**
   * `false` : simple glissement, sans fondu. À réserver au texte au-dessus de la ligne de
   * flottaison : un fondu retarderait le Largest Contentful Paint.
   */
  fade?: boolean
}

/** Un seul observateur pour toute la page : bien moins coûteux qu'un observateur par élément. */
let sharedObserver: IntersectionObserver | null = null

function observe(element: Element): () => void {
  sharedObserver ??= new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -12% 0px' },
  )
  sharedObserver.observe(element)
  return () => sharedObserver?.unobserve(element)
}

/**
 * Apparition douce au scroll (fondu + léger décalage), pilotée par CSS.
 * Les préférences « réduire les animations » sont gérées dans la feuille de style.
 */
export function Reveal({ children, className, delay = 0, y = 20, fade = true }: RevealProps) {
  const ref = useCallback((element: HTMLDivElement | null) => (element ? observe(element) : undefined), [])

  return (
    <div
      ref={ref}
      className={cn('reveal', !fade && 'reveal-slide', className)}
      style={{ '--reveal-delay': `${delay}s`, '--reveal-y': `${y}px` } as CSSProperties}
    >
      {children}
    </div>
  )
}
