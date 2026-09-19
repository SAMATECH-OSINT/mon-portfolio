import { Reveal } from '@/components/ui/Reveal'
import { impactChain } from '@/data/valueChain'
import { cn } from '@/lib/cn'

/** DATA → ENGINEERING → INTELLIGENCE → SECURITY → DECISION → IMPACT. */
export function ImpactSequence() {
  const last = impactChain.length - 1

  return (
    <ol aria-label="De la donnée à l’impact" className="relative grid gap-8 md:grid-cols-6 md:gap-4">
      {/* Fil horizontal animé (tablette et plus) */}
      <svg
        aria-hidden
        focusable="false"
        viewBox="0 0 100 2"
        preserveAspectRatio="none"
        className="absolute left-[8.33%] top-6 hidden h-1 w-[83.34%] text-cyan md:block"
      >
        <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="flow-line" />
      </svg>
      {/* Fil vertical (mobile) */}
      <span aria-hidden className="absolute bottom-6 left-6 top-6 w-px bg-linear-to-b from-electric/60 via-cyan/60 to-gold/70 md:hidden" />

      {impactChain.map((step, index) => {
        const isImpact = index === last
        return (
          <li key={step.id} className="relative flex items-center gap-5 md:flex-col md:gap-4 md:text-center">
            <Reveal delay={index * 0.09} className="flex items-center gap-5 md:flex-col md:gap-4">
              <span
                className={cn(
                  'relative grid size-12 shrink-0 place-items-center rounded-full border bg-navy-950 font-mono text-sm',
                  isImpact
                    ? 'border-gold text-gold shadow-[0_0_32px_-4px_rgb(201_162_75/0.7)]'
                    : 'border-cyan/50 text-cyan shadow-[0_0_24px_-8px_rgb(0_217_255/0.6)]',
                )}
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'font-display text-lg font-semibold uppercase tracking-[0.08em] md:text-[0.9rem] lg:text-base',
                  isImpact ? 'text-gold' : 'text-ink',
                )}
              >
                {step.label}
              </span>
            </Reveal>
          </li>
        )
      })}
    </ol>
  )
}
