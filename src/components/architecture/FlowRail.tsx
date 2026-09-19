import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import type { FlowNode } from '@/data/architecture'
import { FlowConnector } from './FlowConnector'

interface FlowRailProps {
  steps: readonly FlowNode[]
  /** Nom de la liste pour les technologies d'assistance. */
  label: string
}

/**
 * Chaîne verticale : chaque étape est un nœud numéroté relié à la suivante par un
 * flux animé. Lisible du mobile au desktop, sans mise en page spécifique.
 */
export function FlowRail({ steps, label }: FlowRailProps) {
  return (
    <ol aria-label={label} className="relative">
      {steps.map((step, index) => {
        const last = index === steps.length - 1
        return (
          <li key={step.id} className="relative pl-16 pb-5 last:pb-0">
            <span className="absolute left-0 top-0 grid size-12 place-items-center rounded-xl border border-line-strong bg-navy-900 text-cyan shadow-[0_0_24px_-6px_rgb(0_217_255/0.5)]">
              <Icon name={step.icon} className="size-5" />
            </span>
            {!last && <FlowConnector className="absolute left-[1.125rem] top-14 h-[calc(100%-3.5rem)]" />}

            <Reveal delay={Math.min(index * 0.05, 0.25)}>
              <div className="rounded-card border border-line bg-surface p-4 transition-colors duration-300 hover:border-cyan/40 sm:p-5">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-mono text-xs text-ink-subtle">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="text-lg text-ink">{step.label}</h3>
                </div>
                <p className="mt-2 text-sm text-ink-muted">{step.role}</p>
                {step.technologies.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {step.technologies.map((tech) => (
                      <li key={tech}>
                        <Badge>{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </li>
        )
      })}
    </ol>
  )
}
