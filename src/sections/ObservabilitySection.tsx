import { FlowRail } from '@/components/architecture/FlowRail'
import { Section } from '@/components/layout/Section'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { observabilityFlow, securityTools } from '@/data/architecture'

export function ObservabilitySection() {
  return (
    <Section id="observability">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <FlowRail steps={observabilityFlow} label="Chaîne d’observabilité et de sécurité" />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-28">
          <SectionHeading
            id="observability"
            eyebrow="Monitoring & détection"
            title="Observability & Security"
            description="Rendre les systèmes observables pour les surveiller, détecter les anomalies et y répondre."
          />
          <ul className="mt-10 grid gap-3">
            {securityTools.map((tool, index) => (
              <li key={tool.name}>
                <Reveal delay={index * 0.05}>
                  <Card compact>
                    <p className="font-display text-base font-medium text-ink">{tool.name}</p>
                    <p className="mt-1 text-sm text-ink-muted">{tool.role}</p>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
