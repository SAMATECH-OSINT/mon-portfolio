import { FlowConnector } from '@/components/architecture/FlowConnector'
import { cn } from '@/lib/cn'

interface ProjectFlowProps {
  steps: readonly string[]
}

/** Architecture conceptuelle d'un projet : étapes reliées par un flux animé. */
export function ProjectFlow({ steps }: ProjectFlowProps) {
  const last = steps.length - 1
  return (
    <ol aria-label="Architecture" className="flex flex-col items-stretch">
      {steps.map((step, index) => (
        <li key={`${step}-${index}`} className="flex flex-col items-center">
          <span
            className={cn(
              'w-full rounded-lg border px-3.5 py-2 text-center text-sm font-medium',
              index === 0 || index === last
                ? 'border-cyan/40 bg-cyan/[0.07] text-ink'
                : 'border-line-strong bg-white/[0.03] text-ink-muted',
            )}
          >
            {step}
          </span>
          {index < last && <FlowConnector className="h-4" />}
        </li>
      ))}
    </ol>
  )
}
