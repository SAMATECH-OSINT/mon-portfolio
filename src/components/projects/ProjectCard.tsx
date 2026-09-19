import { ArrowUpRight, Check } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { isFeatured } from '@/data/projects'
import type { Project, ProjectContent } from '@/data/projects'
import { TODO, isTodo } from '@/data/types'
import { cn } from '@/lib/cn'
import { ProjectFlow } from './ProjectFlow'

interface ProjectCardProps {
  project: Project
  index: number
}

interface Row {
  label: string
  content: ProjectContent
}

const rowLabel = 'font-mono text-[0.7rem] uppercase tracking-widest text-ink-subtle'

/** Une section est masquée tant qu'elle n'a aucune donnée vérifiée. */
function hasContent(content: ProjectContent): boolean {
  return Array.isArray(content) ? content.length > 0 : !isTodo(content)
}

function Content({ content }: { content: ProjectContent }) {
  if (typeof content === 'string') return <>{content}</>
  const items = content as readonly string[]
  return (
    <ul className={cn('grid gap-1.5', items.length > 5 && 'sm:grid-cols-2')}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <Check className="mt-1 size-3.5 shrink-0 text-cyan" aria-hidden />
          {item}
        </li>
      ))}
    </ul>
  )
}

/**
 * Case study : Contexte → Problématique → Solution → Architecture → Données → Technologies → Sécurité
 * → Analyse / IA → Résultats ou usages → Aide à la décision. Les sections sans donnée ne sont pas affichées.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const detail = project.publicationValidated
  const featured = isFeatured(project)

  // Les sections « détail » ne sont publiées que si la fiche est validée pour publication.
  const rows: Row[] = [
    { label: 'Problématique', content: detail ? project.problem : TODO },
    { label: 'Solution', content: detail ? project.solution : TODO },
    { label: 'Fonctionnalités', content: detail ? project.features : [] },
    { label: 'Données', content: project.data },
    { label: 'Sécurité', content: detail ? project.security : TODO },
    { label: 'Analyse / IA', content: project.analysis },
    ...(detail ? project.extras : []),
    { label: 'Résultats / usages', content: detail ? project.outcome : TODO },
    { label: 'Aide à la décision', content: project.decision },
  ].filter((row) => hasContent(row.content))

  const links = [
    { label: 'Démo', href: project.links.demo },
    { label: 'Code source', href: project.links.repository },
  ].filter((link): link is { label: string; href: string } => !isTodo(link.href))

  const technologies =
    project.technologies.length > 0 ? (
      <div>
        <p className={rowLabel}>Technologies</p>
        <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.map((tech) => (
            <li key={tech}>
              <Badge>{tech}</Badge>
            </li>
          ))}
        </ul>
      </div>
    ) : null

  const rowList =
    rows.length > 0 ? (
      <dl className="grid gap-5">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className={rowLabel}>{row.label}</dt>
            <dd className="mt-1.5 text-sm text-ink-muted">
              <Content content={row.content} />
            </dd>
          </div>
        ))}
      </dl>
    ) : null

  return (
    <Card as="article" interactive className={cn('flex h-full flex-col', featured && 'lg:p-9')}>
      <header>
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
          <span className="font-mono text-sm text-cyan">{String(index + 1).padStart(2, '0')}</span>
          {!isTodo(project.context) && <Badge variant="accent">{project.context}</Badge>}
        </div>
        <h3 className={cn('mt-4 text-h3 text-ink', featured && 'max-w-3xl')}>{project.title}</h3>
        {!isTodo(project.summary) && (
          <p className={cn('mt-3 text-ink-muted', featured && 'max-w-3xl text-base')}>{project.summary}</p>
        )}
        {!isTodo(project.tagline) && (
          <p className="mt-4 max-w-3xl border-l-2 border-gold/60 pl-4 font-display text-lg italic text-ink">
            « {project.tagline} »
          </p>
        )}
        {project.figures.length > 0 && (
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap" aria-label="Chiffres clés">
            {project.figures.map((figure) => (
              <li key={figure.label} className="rounded-xl border border-line-strong bg-navy-900/70 px-5 py-3">
                <span className="block font-display text-2xl font-semibold text-ink">{figure.value}</span>
                <span className="text-xs text-ink-muted">{figure.label}</span>
              </li>
            ))}
          </ul>
        )}
        {project.highlights.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Points clés">
            {project.highlights.map((item) => (
              <li key={item}>
                <Badge variant={featured ? 'accent' : 'tech'}>{item}</Badge>
              </li>
            ))}
          </ul>
        )}
      </header>

      {featured ? (
        <div className="mt-8 grid gap-8 border-t border-line pt-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">{rowList}</div>
          <div className="grid content-start gap-7 lg:col-span-5">
            <div>
              <p className={rowLabel}>Architecture</p>
              <div className="mt-3">
                <ProjectFlow steps={project.architecture} />
              </div>
            </div>
            {technologies}
          </div>
        </div>
      ) : (
        <>
          {rowList && <div className="mt-6 border-t border-line pt-6">{rowList}</div>}
          {technologies && <div className="mt-auto pt-6">{technologies}</div>}
        </>
      )}

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
