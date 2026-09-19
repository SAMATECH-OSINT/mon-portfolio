import { cn } from '@/lib/cn'

interface FlowConnectorProps {
  className?: string
}

/** Segment vertical animé (flux de données descendant) avec pointe de flèche. */
export function FlowConnector({ className }: FlowConnectorProps) {
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox="0 0 12 100"
      preserveAspectRatio="none"
      className={cn('block w-3 text-cyan', className)}
    >
      <line
        x1="6"
        y1="0"
        x2="6"
        y2="100"
        stroke="currentColor"
        strokeOpacity="0.55"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        className="flow-line"
      />
    </svg>
  )
}
