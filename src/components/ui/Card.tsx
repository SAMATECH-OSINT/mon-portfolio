import type { ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardProps {
  as?: Extract<ElementType, 'div' | 'article' | 'li'>
  /** Ajoute l'effet de survol (glow + élévation). */
  interactive?: boolean
  /** Marges intérieures réduites (listes denses). */
  compact?: boolean
  className?: string
  children: ReactNode
}

/** Surface de base : verre sombre, filet lumineux en tête, glow au survol. */
export function Card({ as: Tag = 'div', interactive = false, compact = false, className, children }: CardProps) {
  return (
    <Tag
      className={cn(
        'relative overflow-hidden rounded-card border border-line bg-surface',
        compact ? 'p-4' : 'p-6 sm:p-7',
        "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-linear-to-r before:from-transparent before:via-cyan/40 before:to-transparent before:content-['']",
        'transition-[border-color,box-shadow,transform] duration-500 ease-out-expo',
        interactive &&
          'hover:border-cyan/40 hover:shadow-glow motion-safe:hover:-translate-y-0.5',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
