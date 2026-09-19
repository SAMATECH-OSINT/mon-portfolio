import { Icon } from '@/components/ui/Icon'
import { profile } from '@/data/profile'
import { isTodo } from '@/data/types'

/**
 * Micro-indicateurs du Hero. Les chiffres n'apparaissent que lorsqu'ils sont
 * renseignés (donc validés) dans profile.ts ; sinon seuls les repères qualitatifs sont affichés.
 */
export function HeroIndicators() {
  const { stats, heroHighlights } = profile
  const figures = [
    { value: stats.yearsExperience, label: 'années d’expérience' },
    { value: stats.projects, label: 'projets' },
  ].filter((figure) => !isTodo(figure.value))

  return (
    <ul className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
      {figures.map((figure) => (
        <li key={figure.label} className="flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold text-ink">{figure.value}</span>
          <span className="text-sm text-ink-muted">{figure.label}</span>
        </li>
      ))}
      {heroHighlights.map((item) => (
        <li key={item.label} className="flex items-center gap-2.5 text-sm text-ink-muted">
          <span className="grid size-8 place-items-center rounded-lg border border-line-strong bg-navy-900/70 text-cyan">
            <Icon name={item.icon} className="size-4" />
          </span>
          {item.label}
        </li>
      ))}
    </ul>
  )
}
