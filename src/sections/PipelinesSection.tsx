import { FlowRail } from '@/components/architecture/FlowRail'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { pipelineConcepts, pipelineFlow } from '@/data/architecture'

export function PipelinesSection() {
  return (
    <Section id="pipelines">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <SectionHeading
            id="pipelines"
            eyebrow="Big Data & Distributed Data Processing"
            title="Big Data & Data Pipelines"
            description="Ingérer, transformer et traiter des données à grande échelle, en batch comme en streaming."
          />
          <dl className="mt-10 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {pipelineConcepts.map((concept, index) => (
              <Reveal key={concept.label} delay={index * 0.05} className="border-l border-cyan/40 pl-4">
                <dt className="font-display text-base font-medium text-ink">{concept.label}</dt>
                <dd className="mt-1 text-sm text-ink-muted">{concept.description}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-7">
          <FlowRail steps={pipelineFlow} label="Pipeline de données : des sources à l’intelligence artificielle" />
        </div>
      </div>
    </Section>
  )
}
