import { ArrowUpRight, Check } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Pending } from '@/components/ui/Pending'
import type { Project } from '@/data/projects'
import { isTodo } from '@/data/types'
import type { Maybe } from '@/data/types'

interface ProjectCardProps {
  project: Project
  index: number
}

function Field({ label, value }: { label: string; value: Maybe<string> }) {
  return (
    <div>
      <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-subtle">{label}</dt>
      <dd className="mt-1.5 text-sm text-ink-muted">{isTodo(value) ? <Pending /> : value}</dd>
    </div>
  )
}

/** Case study : Problem → Solution → Architecture → Technologies → Impact / Results. */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const links = [
    { label: 'Démo', href: project.links.demo },
    { label: 'Code source', href: project.links.repository },
  ].filter((link): link is { label: string; href: string } => !isTodo(link.href))

  return (
    <Card as="article" interactive className="flex h-full flex-col">
      <header>
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-sm text-cyan">{String(index + 1).padStart(2, '0')}</span>
          {!isTodo(project.context) && <Badge variant="accent">{project.context}</Badge>}
        </div>
        <h3 className="mt-4 text-h3 text-ink">{project.title}</h3>
      </header>

      <dl className="mt-6 grid gap-5 border-t border-line pt-6">
        <Field label="Problem" value={project.problem} />
        <Field label="Solution" value={project.solution} />
        <Field label="Architecture" value={project.architecture} />

        <div>
          <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-subtle">Technologies</dt>
          <dd className="mt-2">
            <ul className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <li key={tech}>
                  <Badge>{tech}</Badge>
                </li>
              ))}
            </ul>
          </dd>
        </div>

        {project.features.length > 0 && (
          <div>
            <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-subtle">Fonctionnalités</dt>
            <dd className="mt-2">
              <ul className="grid gap-1.5 text-sm text-ink-muted sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-3.5 shrink-0 text-cyan" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        )}

        <Field label="Impact / Results" value={project.result} />
      </dl>

      {links.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-4 border-t border-line pt-5 text-sm">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-cyan hover:underline"
              >
                {link.label}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
