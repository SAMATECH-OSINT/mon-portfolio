import { Check } from 'lucide-react'
import { ProjectFlow } from '@/components/projects/ProjectFlow'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { doctoralProject } from '@/data/research'

const label = 'font-mono text-[0.7rem] uppercase tracking-widest text-ink-subtle'

/** Projet doctoral : présentation, axes de recherche et approche conceptuelle. */
export function DoctoralProject() {
  const project = doctoralProject

  return (
    <Card as="article" className="lg:p-9">
      <header>
        <Badge variant="gold">{project.status}</Badge>
        <h3 className="mt-5 max-w-3xl text-h3 text-ink">
          {project.title}
        </h3>
        <p className="mt-3 max-w-3xl text-base text-ink-muted">{project.summary}</p>
      </header>

      <div className="mt-8 grid gap-8 border-t border-line pt-8 lg:grid-cols-12 lg:gap-12">
        <div className="grid content-start gap-7 lg:col-span-7">
          <div>
            <p className={label}>Approche</p>
            <p className="mt-2 text-sm text-ink-muted">{project.approach}</p>
            <ul className="mt-4 grid gap-1.5 text-sm text-ink-muted">
              {project.objectives.map((objective) => (
                <li key={objective} className="flex items-start gap-2">
                  <Check className="mt-1 size-3.5 shrink-0 text-cyan" aria-hidden />
                  {objective}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className={label}>Axes de recherche</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.axes.map((axis) => (
                <li key={axis}>
                  <Badge variant="accent">{axis}</Badge>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5">
          <p className={label}>Approche conceptuelle</p>
          <div className="mt-3">
            <ProjectFlow steps={project.pipeline} />
          </div>
        </div>
      </div>
    </Card>
  )
}
