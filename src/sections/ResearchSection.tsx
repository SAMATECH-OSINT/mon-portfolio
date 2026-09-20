import { DoctoralProject } from '@/components/research/DoctoralProject'
import { Section } from '@/components/layout/Section'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { researchAxes } from '@/data/research'

export function ResearchSection() {
  return (
    <Section id="research">
      <SectionHeading
        id="research"
        eyebrow="Recherche"
        title="Research & Scientific Interests"
        description="Un projet doctoral en IA et cybersécurité, et des axes de réflexion à l’intersection de la donnée, de l’intelligence artificielle, de la sécurité et de la gouvernance."
      />

      <div className="mt-14">
        <Reveal>
          <DoctoralProject />
        </Reveal>
      </div>

      <h3 className="mt-16 font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">Intérêts scientifiques</h3>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {researchAxes.map((axis, index) => (
          <li key={axis.id}>
            <Reveal delay={(index % 4) * 0.07} className="h-full">
              <Card interactive compact className="flex h-full flex-col gap-5 sm:p-5">
                <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-navy-900 text-cyan">
                  <Icon name={axis.icon} className="size-5" />
                </span>
                <p className="font-display text-lg font-medium leading-snug text-ink">{axis.label}</p>
              </Card>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
