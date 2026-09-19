import { Fragment } from 'react'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import type { FlowRow } from '@/data/architecture'
import { cn } from '@/lib/cn'
import { FlowConnector } from './FlowConnector'

interface LayeredFlowProps {
  rows: readonly FlowRow[]
  label: string
}

const columns: Record<number, string> = {
  1: 'sm:grid-cols-1 sm:max-w-md',
  2: 'sm:grid-cols-2 sm:max-w-3xl',
  3: 'sm:grid-cols-3 sm:max-w-4xl',
}

/**
 * Topologie en couches : chaque rangée regroupe les briques de même niveau
 * (ex. Render / VPS / AWS), reliées à la couche suivante par un flux animé.
 */
export function LayeredFlow({ rows, label }: LayeredFlowProps) {
  return (
    <ol aria-label={label} className="flex flex-col items-center">
      {rows.map((row, rowIndex) => (
        <Fragment key={row.id}>
          <li className={cn('grid w-full gap-3', columns[row.nodes.length])}>
            {row.nodes.map((node, i) => (
              <Reveal key={node.id} delay={Math.min((rowIndex + i) * 0.05, 0.3)} className="h-full">
                <div className="h-full rounded-card border border-line bg-surface p-4 text-center transition-[border-color,box-shadow] duration-300 hover:border-cyan/40 hover:shadow-glow sm:p-5">
                  <span className="mx-auto grid size-10 place-items-center rounded-xl border border-line-strong bg-navy-900 text-cyan">
                    <Icon name={node.icon} className="size-5" />
                  </span>
                  <h3 className="mt-3 text-lg text-ink">{node.label}</h3>
                  <p className="mt-1.5 text-sm text-ink-muted">{node.role}</p>
                  <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {node.technologies.map((tech) => (
                      <li key={tech}>
                        <Badge>{tech}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </li>
          {rowIndex < rows.length - 1 && (
            <li aria-hidden className="list-none">
              <FlowConnector className="h-9" />
            </li>
          )}
        </Fragment>
      ))}
    </ol>
  )
}
