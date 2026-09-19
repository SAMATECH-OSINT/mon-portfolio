import { Fragment, useState } from 'react'
import { FlowConnector } from '@/components/architecture/FlowConnector'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import type { SkillDomain } from '@/data/skills'
import { profile } from '@/data/profile'
import { cn } from '@/lib/cn'
import { domainsSharing, relatedDomainIds } from '@/lib/skills'

/**
 * Disposition de la matrice : de l'IA (sommet) au développement (base),
 * avec le triptyque Data / Cloud / Cyber au centre.
 */
const LAYERS: ReadonlyArray<readonly string[]> = [
  ['ai'],
  ['data', 'cloud', 'cybersecurity'],
  ['databases', 'bigdata'],
  ['networks'],
  ['development'],
]

interface SkillsMatrixProps {
  domains: readonly SkillDomain[]
}

export function SkillsMatrix({ domains }: SkillsMatrixProps) {
  const [selectedId, setSelectedId] = useState('cybersecurity')
  const selected = domains.find((domain) => domain.id === selectedId) ?? domains[0]!
  const related = relatedDomainIds(domains, selected.id)

  return (
    <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-6">
        <div className="mx-auto flex max-w-lg flex-col items-center">
          <p className="rounded-full border border-line-strong bg-navy-900 px-4 py-1.5 font-display text-sm font-medium tracking-wide text-ink">
            {profile.name}
          </p>

          {LAYERS.map((layer) => (
            <Fragment key={layer.join('-')}>
              <FlowConnector className="h-7" />
              <div className={cn('grid w-full gap-2.5 sm:gap-3', layer.length === 3 ? 'grid-cols-3' : layer.length === 2 ? 'mx-auto max-w-md grid-cols-2' : 'mx-auto max-w-[15rem] grid-cols-1')}>
                {layer.map((id) => {
                  const domain = domains.find((d) => d.id === id)
                  if (!domain) return null
                  const isSelected = domain.id === selected.id
                  const isRelated = related.has(domain.id)
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedId(id)}
                      className={cn(
                        'group relative flex flex-col items-center gap-2 rounded-card border px-2 py-4 text-center transition-[border-color,background-color,box-shadow] duration-300 sm:px-4',
                        isSelected
                          ? 'border-cyan bg-cyan/[0.08] shadow-glow'
                          : isRelated
                            ? 'border-cyan/35 bg-surface'
                            : 'border-line bg-surface hover:border-cyan/40',
                      )}
                    >
                      <Icon name={domain.icon} className={cn('size-6 transition-colors', isSelected ? 'text-cyan' : 'text-ink-muted group-hover:text-cyan')} />
                      <span className="font-display text-sm font-medium text-ink sm:text-base">{domain.label}</span>
                      <span className="font-mono text-[0.65rem] text-ink-subtle">
                        {domain.technologies.length} technologies
                      </span>
                      {isRelated && !isSelected && (
                        <span className="absolute right-2 top-2 size-1.5 rounded-full bg-cyan" title="Éléments en commun" />
                      )}
                    </button>
                  )
                })}
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="lg:col-span-6 lg:sticky lg:top-28" aria-live="polite">
          <div key={selected.id} className="rounded-card border border-line bg-surface p-6 motion-safe:animate-swap-in sm:p-8">
            <div className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-xl border border-line-strong bg-navy-900 text-cyan">
                <Icon name={selected.icon} className="size-6" />
              </span>
              <div>
                <h3 className="text-h3 text-ink">{selected.title}</h3>
                <p className="text-sm text-ink-muted">{selected.summary}</p>
              </div>
            </div>

            {(selected.groups ?? [{ label: 'Technologies', items: selected.technologies }]).map((group) => (
              <div key={group.label}>
                <h4 className="mt-7 font-mono text-[0.7rem] uppercase tracking-widest text-ink-subtle">{group.label}</h4>
                <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {group.items.map((tech) => {
                    const shared = domainsSharing(domains, selected.id, tech)
                    return (
                      <li
                        key={tech}
                        className={cn(
                          'rounded-lg border px-3 py-2.5',
                          shared.length > 0 ? 'border-cyan/30 bg-cyan/[0.05]' : 'border-line bg-white/[0.02]',
                        )}
                      >
                        <span className="block text-sm font-medium text-ink">{tech}</span>
                        {shared.length > 0 && (
                          <span className="mt-0.5 block font-mono text-[0.65rem] text-cyan">
                            + {shared.map((d) => d.label).join(', ')}
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}

            {selected.focus.length > 0 && (
              <>
                <h4 className="mt-7 font-mono text-[0.7rem] uppercase tracking-widest text-ink-subtle">Périmètre</h4>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {selected.focus.map((item) => (
                    <li key={item}>
                      <Badge>{item}</Badge>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
      </div>
    </div>
  )
}
