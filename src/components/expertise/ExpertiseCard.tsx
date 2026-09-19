import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import type { SkillDomain } from '@/data/skills'
import { cn } from '@/lib/cn'

interface ExpertiseCardProps {
  domain: SkillDomain
  /** Axe mis en avant (Cloud, Big Data) : liseré lumineux. */
  featured?: boolean
  /** Carte sur deux colonnes : les groupes de technologies se répartissent en deux colonnes. */
  wide?: boolean
  className?: string
}

export function ExpertiseCard({ domain, featured = false, wide = false, className }: ExpertiseCardProps) {
  return (
    <Card
      as="article"
      interactive
      className={cn(
        'flex h-full flex-col',
        featured && 'border-cyan/25 bg-linear-to-b from-electric/[0.09] to-surface',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-xl border border-line-strong bg-navy-900 text-cyan">
          <Icon name={domain.icon} className="size-6" />
        </span>
        {featured && <Badge variant="accent">Axe clé</Badge>}
      </div>

      <h3 className="mt-5 text-h3 text-ink">{domain.title}</h3>
      <p className="mt-2 text-ink-muted">{domain.summary}</p>

      {domain.focus.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-muted">
          {domain.focus.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span aria-hidden className="size-1 rounded-full bg-cyan/70" />
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto pt-6">
        {domain.groups ? (
          <div className={cn('grid gap-4', wide && 'sm:grid-cols-2')}>
            {domain.groups.map((group) => (
              <div key={group.label}>
                <p className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-subtle">{group.label}</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {group.items.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {domain.technologies.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  )
}
