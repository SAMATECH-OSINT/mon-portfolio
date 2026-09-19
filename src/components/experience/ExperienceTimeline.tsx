import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Pending } from '@/components/ui/Pending'
import { Reveal } from '@/components/ui/Reveal'
import type { Experience } from '@/data/experience'
import { isTodo } from '@/data/types'
import { formatPeriod } from '@/lib/display'

interface ExperienceTimelineProps {
  items: readonly Experience[]
}

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <ol className="relative ml-3 border-l border-line-strong pl-8 sm:ml-4 sm:pl-12">
      {items.map((item, index) => {
        const current = item.period.end === null
        return (
          <li key={item.id} className="relative pb-10 last:pb-0">
            <span
              aria-hidden
              className="absolute -left-[2.5625rem] top-2 flex size-3 sm:-left-[3.5625rem] sm:size-3.5"
            >
              {current && <span className="absolute inline-flex size-full rounded-full bg-cyan opacity-50 motion-safe:animate-ping" />}
              <span className="relative inline-flex size-full rounded-full border-2 border-cyan bg-navy-950" />
            </span>

            <Reveal delay={index * 0.08}>
              <Card as="div" interactive>
                <p className="font-mono text-xs uppercase tracking-widest text-cyan">
                  {formatPeriod(item.period.start, item.period.end)}
                </p>
                <h3 className="mt-3 text-h3 text-ink">{item.organization}</h3>
                <p className="mt-1.5 font-medium text-ink">{isTodo(item.role) ? <Pending /> : item.role}</p>
                <p className="mt-3 text-ink-muted">{item.summary}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.focus.map((focus) => (
                    <li key={focus}>
                      <Badge>{focus}</Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </li>
        )
      })}
    </ol>
  )
}
