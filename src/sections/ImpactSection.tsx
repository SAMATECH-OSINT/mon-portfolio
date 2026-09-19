import { ImpactSequence } from '@/components/impact/ImpactSequence'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { impactStatement } from '@/data/valueChain'

export function ImpactSection() {
  return (
    <Section id="impact">
      <SectionHeading id="impact" eyebrow="Vision" title="From Data to Impact" align="center" />

      <div className="mt-16">
        <ImpactSequence />
      </div>

      <Reveal delay={0.1}>
        <p className="gradient-text mx-auto mt-20 max-w-4xl text-center font-display text-[clamp(2rem,1.2rem+4vw,4.25rem)] font-semibold leading-[1.05] tracking-tight">
          {impactStatement}
        </p>
      </Reveal>
    </Section>
  )
}
