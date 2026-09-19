import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import type { FlowNode } from '@/data/architecture'
import { useInView } from '@/hooks/useInView'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/cn'
import { FlowRail } from './FlowRail'

interface ChainExplorerProps {
  steps: readonly FlowNode[]
  label: string
}

const AUTO_ADVANCE_MS = 3600

/**
 * Chaîne interactive (desktop) : sélection au survol, au clic ou au clavier, avec
 * progression automatique lente tant que l'utilisateur n'interagit pas.
 * Sur mobile / tablette, la même donnée est présentée en chaîne verticale.
 */
export function ChainExplorer({ steps, label }: ChainExplorerProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [interacting, setInteracting] = useState(false)
  const [containerRef, inView] = useInView<HTMLDivElement>()
  const reduceMotion = usePrefersReducedMotion()

  const paused = interacting || reduceMotion || !inView
  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => setActiveIndex((i) => (i + 1) % steps.length), AUTO_ADVANCE_MS)
    return () => window.clearInterval(id)
  }, [paused, steps.length])

  const active = steps[activeIndex] ?? steps[0]!

  return (
    <div ref={containerRef}>
      <div className="lg:hidden">
        <FlowRail steps={steps} label={label} />
      </div>

      <div
        className="hidden lg:block"
        onPointerEnter={() => setInteracting(true)}
        onPointerLeave={() => setInteracting(false)}
        onFocus={() => setInteracting(true)}
        onBlur={() => setInteracting(false)}
      >
        <ol aria-label={label} className="relative grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          {/* Fil de données derrière les nœuds */}
          <svg aria-hidden focusable="false" className="absolute left-0 top-6 h-1 w-full text-cyan" preserveAspectRatio="none" viewBox="0 0 100 2">
            <line x1="5.5" y1="1" x2="94.5" y2="1" stroke="currentColor" strokeOpacity="0.5" strokeWidth="1.5" vectorEffect="non-scaling-stroke" className="flow-line" />
          </svg>

          {steps.map((step, index) => {
            const selected = index === activeIndex
            return (
              <li key={step.id} className="relative flex justify-center">
                <button
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveIndex(index)}
                  onPointerEnter={() => setActiveIndex(index)}
                  className="group flex w-full flex-col items-center gap-3 rounded-xl px-1 pb-2 text-center"
                >
                  <span
                    className={cn(
                      'relative grid size-12 place-items-center rounded-xl border bg-navy-900 transition-[border-color,color,box-shadow,transform] duration-500 ease-out-expo',
                      selected
                        ? 'scale-110 border-cyan text-cyan shadow-[0_0_28px_-4px_rgb(0_217_255/0.65)]'
                        : 'border-line-strong text-ink-muted group-hover:border-cyan/50 group-hover:text-cyan',
                    )}
                  >
                    <Icon name={step.icon} className="size-5" />
                  </span>
                  <span
                    className={cn(
                      'font-display text-[0.8125rem] font-medium leading-tight transition-colors duration-300',
                      selected ? 'text-ink' : 'text-ink-muted group-hover:text-ink',
                    )}
                  >
                    {step.label}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>

        <div className="mt-8 min-h-44 rounded-card border border-line bg-surface p-6 sm:p-8" aria-live="polite">
            <div key={active.id} className="grid gap-6 motion-safe:animate-swap-in md:grid-cols-[auto_1fr] md:items-start">
              <p className="font-mono text-sm text-ink-subtle">
                {String(activeIndex + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
              </p>
              <div>
                <h3 className="text-h3 text-ink">{active.label}</h3>
                <p className="mt-2 max-w-2xl text-ink-muted">{active.role}</p>
                {active.technologies.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {active.technologies.map((tech) => (
                      <li key={tech}>
                        <Badge variant="accent">{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
