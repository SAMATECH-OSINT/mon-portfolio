import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  /** Identifiant de la section : génère l'id du titre (`<id>-title`) pour `aria-labelledby`. */
  id: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={cn('max-w-3xl', centered && 'mx-auto text-center', className)}>
      <Reveal>
        <p className={cn('eyebrow flex items-center gap-3', centered && 'justify-center')}>
          <span aria-hidden className="h-px w-8 bg-cyan/60" />
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 id={`${id}-title`} className="mt-5 text-h2 text-ink">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-lead text-ink-muted">{description}</p>
        </Reveal>
      )}
    </div>
  )
}
