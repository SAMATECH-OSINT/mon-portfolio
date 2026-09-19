import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { teachingDomains } from '@/data/teaching'

export function TeachingSection() {
  return (
    <Section id="teaching">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="teaching"
            eyebrow="Enseignement"
            title="Transmettre le numérique"
            description="Cybersécurité, bases de données et technologies Web : des enseignements et un accompagnement de projets étudiants."
          />
        </div>

        <ol className="lg:col-span-7">
          {teachingDomains.map((domain, index) => (
            <li key={domain.id}>
              <Reveal delay={Math.min(index * 0.05, 0.3)}>
                <div className="group flex items-center gap-5 border-b border-line py-4 transition-colors duration-300 first:border-t hover:border-cyan/40 sm:gap-8 sm:py-5">
                  <span className="font-mono text-sm text-ink-subtle transition-colors group-hover:text-cyan">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="font-display text-lg font-medium text-ink sm:text-xl">{domain.label}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
