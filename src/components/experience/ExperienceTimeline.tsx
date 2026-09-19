import { Check } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
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
        const period = formatPeriod(item.period.start, item.period.end)
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
                {period && <p className="font-mono text-xs uppercase tracking-widest text-cyan">{period}</p>}
                <h3 className="mt-3 text-h3 text-ink">
                  {item.organization}
                  {item.affiliation && <span className="text-ink-muted"> — {item.affiliation}</span>}
                </h3>
                {!isTodo(item.role) && <p className="mt-1.5 font-medium text-ink">{item.role}</p>}
                <p className="mt-3 text-ink-muted">{item.summary}</p>

                <ul className="mt-5 grid gap-2 text-sm text-ink-muted">
                  {item.responsibilities.map((line) => (
                    <li key={line} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-cyan" aria-hidden />
                      {line}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-2 border-t border-line pt-5">
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
