import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BadgeVariant = 'tech' | 'accent' | 'gold' | 'pending'

interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: ReactNode
}

const variants: Record<BadgeVariant, string> = {
  /** Étiquette technologique. */
  tech: 'border-line-strong bg-white/[0.03] text-ink-muted',
  /** Mise en avant (domaine, statut). */
  accent: 'border-cyan/30 bg-cyan/[0.08] text-cyan',
  /** Touche institutionnelle (diplômes, certifications). */
  gold: 'border-gold/40 bg-gold/[0.08] text-gold',
  /** Donnée manquante. */
  pending: 'border-dashed border-line-strong text-ink-subtle',
}

export function Badge({ variant = 'tech', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs leading-none tracking-wide',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
