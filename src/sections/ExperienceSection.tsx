import { ExperienceTimeline } from '@/components/experience/ExperienceTimeline'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { experiences } from '@/data/experience'

export function ExperienceSection() {
  return (
    <Section id="experience">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="experience"
            eyebrow="Expérience"
            title="Parcours professionnel"
            description="Systèmes d’information, sécurité, données et transformation numérique."
          />
        </div>
        <div className="lg:col-span-8">
          <ExperienceTimeline items={experiences} />
        </div>
      </div>
    </Section>
  )
}
