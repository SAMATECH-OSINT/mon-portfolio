import type { ProjectCategory } from '@/data/projects'
import { projectCategories } from '@/data/projects'
import { cn } from '@/lib/cn'

export type ProjectFilterValue = ProjectCategory | null

interface ProjectFilterProps {
  value: ProjectFilterValue
  onChange: (value: ProjectFilterValue) => void
  /** Nombre de projets par rubrique. */
  counts: Record<ProjectCategory, number>
  total: number
}

const chip =
  'rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-300 focus-visible:outline-offset-2'

/** Filtre par rubrique : boutons à bascule, accessibles au clavier. */
export function ProjectFilter({ value, onChange, counts, total }: ProjectFilterProps) {
  const options: Array<{ key: ProjectFilterValue; label: string; count: number }> = [
    { key: null, label: 'Tous', count: total },
    ...projectCategories.map((category) => ({ key: category, label: category, count: counts[category] })),
  ]

  return (
    <div role="group" aria-label="Filtrer les projets par rubrique" className="flex flex-wrap gap-2">
      {options.map((option) => {
        const active = option.key === value
        return (
          <button
            key={option.label}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(option.key)}
            className={cn(
              chip,
              active
                ? 'border-cyan bg-cyan/10 text-ink'
                : 'border-line-strong bg-white/[0.02] text-ink-muted hover:border-cyan/50 hover:text-ink',
            )}
          >
            {option.label}
            <span className="ml-2 font-mono text-xs text-ink-subtle">{option.count}</span>
          </button>
        )
      })}
    </div>
  )
}
