import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import type { Project } from '@/data/projects'
import { isTodo } from '@/data/types'
import type { Maybe } from '@/data/types'

interface ProjectCardProps {
  project: Project
  index: number
}

interface DetailRow {
  label: string
  value: Maybe<string>
}

/**
 * Case study : Context → Problem → Solution → Architecture → Technologies → Data → Security → Results / Impact.
 * Les détails ne sont publiés que si `publicationValidated` ; une valeur `TODO` n'est jamais affichée.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const details: DetailRow[] = project.publicationValidated
    ? [
        { label: 'Problem', value: project.problem },
        { label: 'Solution', value: project.solution },
        { label: 'Architecture', value: project.architecture },
        { label: 'Data', value: project.data },
        { label: 'Security', value: project.security },
        { label: 'Impact / Results', value: project.result },
      ].filter((row) => !isTodo(row.value))
    : []

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
        {!isTodo(project.summary) && <p className="mt-3 text-ink-muted">{project.summary}</p>}
      </header>

      {project.scope.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-muted">
          {project.scope.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span aria-hidden className="size-1 rounded-full bg-cyan/70" />
              {item}
            </li>
          ))}
        </ul>
      )}

      {details.length > 0 && (
        <dl className="mt-6 grid gap-5 border-t border-line pt-6">
          {details.map((row) => (
            <div key={row.label}>
              <dt className="font-mono text-[0.7rem] uppercase tracking-widest text-ink-subtle">{row.label}</dt>
              <dd className="mt-1.5 text-sm text-ink-muted">{row.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {project.technologies.length > 0 && (
        <div className="mt-auto pt-6">
          <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.technologies.map((tech) => (
              <li key={tech}>
                <Badge>{tech}</Badge>
              </li>
            ))}
          </ul>
        </div>
      )}

      {links.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-4 border-t border-line pt-5 text-sm">
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
