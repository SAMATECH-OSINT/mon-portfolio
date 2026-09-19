import { Section } from '@/components/layout/Section'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projects } from '@/data/projects'

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        eyebrow="Projets"
        title="Case studies"
        description="Data, intelligence artificielle et systèmes d’information au service de la décision."
      />

      <ul className="mt-14 grid gap-5 lg:grid-cols-2">
        {projects.map((project, index) => (
          <li key={project.id}>
            <Reveal delay={(index % 2) * 0.1} className="h-full">
              <ProjectCard project={project} index={index} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
