import { useState } from 'react'
import { Section } from '@/components/layout/Section'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { ProjectFilter } from '@/components/projects/ProjectFilter'
import type { ProjectFilterValue } from '@/components/projects/ProjectFilter'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { isFeatured, projectCategories, projects } from '@/data/projects'
import type { ProjectCategory } from '@/data/projects'

const counts = Object.fromEntries(
  projectCategories.map((category) => [category, projects.filter((p) => p.categories.includes(category)).length]),
) as Record<ProjectCategory, number>

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectFilterValue>(null)

  // Le numéro d'une fiche reste celui de sa position d'origine, quel que soit le filtre.
  const visible = projects
    .map((project, index) => ({ project, number: index }))
    .filter(({ project }) => filter === null || project.categories.includes(filter))
  const featured = visible.filter(({ project }) => isFeatured(project))
  const others = visible.filter(({ project }) => !isFeatured(project))

  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        eyebrow="Projets"
        title="Case studies"
        description="Des systèmes qui relient bases de données, sécurité, analytique, intelligence artificielle et aide à la décision."
      />

      <div className="mt-10">
        <ProjectFilter value={filter} onChange={setFilter} counts={counts} total={projects.length} />
        <p className="sr-only" aria-live="polite">
          {visible.length} projet{visible.length > 1 ? 's' : ''} affiché{visible.length > 1 ? 's' : ''}
        </p>
      </div>

      <ul className="mt-8 grid gap-6">
        {featured.map(({ project, number }) => (
          <li key={project.id}>
            <Reveal>
              <ProjectCard project={project} index={number} />
            </Reveal>
          </li>
        ))}
      </ul>

      {others.length > 0 && (
        <>
          {featured.length > 0 && (
            <h3 className="mt-16 font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">Autres projets</h3>
          )}
          <ul className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.map(({ project, number }, position) => (
              <li key={project.id}>
                <Reveal delay={(position % 3) * 0.08} className="h-full">
                  <ProjectCard project={project} index={number} />
                </Reveal>
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  )
}
