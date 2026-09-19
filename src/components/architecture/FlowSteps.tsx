import { Fragment } from 'react'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import type { FlowNode } from '@/data/architecture'
import { FlowRail } from './FlowRail'

interface FlowStepsProps {
  steps: readonly FlowNode[]
  label: string
}

/** Segment horizontal animé, pendant de `FlowConnector` pour les chaînes courtes. */
function HorizontalConnector() {
  return (
    <svg aria-hidden focusable="false" viewBox="0 0 100 12" preserveAspectRatio="none" className="block h-3 w-full text-cyan">
      <line
        x1="0"
        y1="6"
        x2="100"
        y2="6"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        className="flow-line"
      />
    </svg>
  )
}

/**
 * Chaîne courte (quelques étapes) : en ligne sur grand écran, en chaîne verticale
 * sur mobile et tablette. Compréhensible d'un coup d'œil.
 */
export function FlowSteps({ steps, label }: FlowStepsProps) {
  return (
    <>
      <div className="lg:hidden">
        <FlowRail steps={steps} label={label} />
      </div>

      <ol aria-label={label} className="hidden items-stretch lg:flex">
        {steps.map((step, index) => (
          <Fragment key={step.id}>
            <li className="min-w-0 flex-1">
              <Reveal delay={index * 0.06} className="h-full">
                <div className="h-full rounded-card border border-line bg-surface p-5 text-center transition-[border-color,box-shadow] duration-300 hover:border-cyan/40 hover:shadow-glow">
                  <span className="mx-auto grid size-11 place-items-center rounded-xl border border-line-strong bg-navy-900 text-cyan">
                    <Icon name={step.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg text-ink">{step.label}</h3>
                  {step.tag && (
                    <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-widest text-cyan">{step.tag}</p>
                  )}
                  <p className="mt-2 text-sm text-ink-muted">{step.role}</p>
                </div>
              </Reveal>
            </li>
            {index < steps.length - 1 && (
              <li aria-hidden className="grid w-8 shrink-0 list-none place-items-center">
                <HorizontalConnector />
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </>
  )
}
