import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { Container } from './Container'

interface SectionProps {
  id: string
  className?: string
  children: ReactNode
}

/** Section sémantique ancrée ; nommée par le titre `<id>-title` (voir SectionHeading). */
export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('relative py-section', className)}>
      <Container>{children}</Container>
    </section>
  )
}
