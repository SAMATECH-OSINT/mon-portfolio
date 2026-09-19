import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { dataModels, dataModelsHeadline } from '@/data/dataModels'

/** Les trois modèles de données : relationnel, document et graphe. */
export function DataModels() {
  return (
    <div>
      <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">{dataModelsHeadline}</h3>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {dataModels.map((model, index) => (
          <li key={model.id}>
            <Reveal delay={index * 0.07} className="h-full">
              <Card interactive compact className="flex h-full flex-col gap-4 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-navy-900 text-cyan">
                    <Icon name={model.icon} className="size-5" />
                  </span>
                  <Badge variant="accent">{model.family}</Badge>
                </div>
                <div>
                  <h4 className="text-h3 text-ink">{model.label}</h4>
                  <p className="mt-2 text-sm text-ink-muted">{model.description}</p>
                </div>
                <ul className="mt-auto flex flex-wrap gap-1.5">
                  {model.technologies.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}
