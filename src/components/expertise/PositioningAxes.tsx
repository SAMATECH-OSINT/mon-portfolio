import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { engineeringThread, positioningAxes } from '@/data/positioning'
import { cn } from '@/lib/cn'

/** Les cinq axes du profil et le fil conducteur qui les relie. */
export function PositioningAxes() {
  return (
    <div>
      <ol aria-label="Les cinq axes du profil" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {positioningAxes.map((axis, index) => (
          <li key={axis.id} className={cn(index === positioningAxes.length - 1 && 'sm:col-span-2 lg:col-span-1')}>
            <Reveal delay={index * 0.06} className="h-full">
              <Card interactive compact className="flex h-full flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl border border-line-strong bg-navy-900 text-cyan">
                    <Icon name={axis.icon} className="size-5" />
                  </span>
                  <span className="font-mono text-xs text-ink-subtle">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-display text-base font-medium leading-snug text-ink">{axis.label}</h3>
                <p className="text-sm text-ink-muted">{axis.summary}</p>
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal delay={0.2}>
        <ol
          aria-label="Fil conducteur"
          className="mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-ink sm:text-sm"
        >
          {engineeringThread.map((step, index) => (
            <li key={step} className="flex items-center gap-2">
              <span className={index === engineeringThread.length - 1 ? 'text-gold' : undefined}>{step}</span>
              {index < engineeringThread.length - 1 && <ArrowRight className="size-3.5 text-cyan" aria-hidden />}
            </li>
          ))}
        </ol>
      </Reveal>
    </div>
  )
}
