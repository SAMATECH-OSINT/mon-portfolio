import { ArrowRight } from 'lucide-react'
import { FlowRail } from '@/components/architecture/FlowRail'
import { FlowSteps } from '@/components/architecture/FlowSteps'
import { Section } from '@/components/layout/Section'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { observabilityFamilies, socFlow, socPhases, vpnFlow } from '@/data/architecture'
import { technologyRoles } from '@/data/skills'

export function ObservabilitySection() {
  return (
    <Section id="observability">
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="order-2 lg:order-1 lg:col-span-7">
          <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">
            Architecture SOC · conceptuelle
          </h3>
          <FlowRail steps={socFlow} label="Architecture SOC conceptuelle : de la collecte à la supervision" />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-28">
          <SectionHeading
            id="observability"
            eyebrow="Monitoring & détection"
            title="Observability & Security"
            description="Rendre les systèmes observables pour les surveiller, détecter les anomalies et y répondre."
          />
          <Reveal delay={0.1}>
            <ol
              aria-label="Du SOC à la supervision : Collect, Detect, Correlate, Alert, Investigate, Respond, Monitor"
              className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-xs uppercase tracking-[0.12em] text-ink"
            >
              {socPhases.map((phase, index) => (
                <li key={phase} className="flex items-center gap-2">
                  <span className={index === socPhases.length - 1 ? 'text-gold' : undefined}>{phase}</span>
                  {index < socPhases.length - 1 && <ArrowRight className="size-3.5 text-cyan" aria-hidden />}
                </li>
              ))}
            </ol>
          </Reveal>
          <p className="mt-6 text-sm text-ink-subtle">
            Schéma générique et professionnel : il illustre une chaîne de détection et de réponse, sans décrire une
            infrastructure réelle.
          </p>
        </div>
      </div>

      <div className="mt-20">
        <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">Quatre familles d’outils</h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {observabilityFamilies.map((family, index) => (
            <li key={family.id}>
              <Reveal delay={index * 0.06} className="h-full">
                <Card compact interactive className="flex h-full flex-col gap-4 sm:p-5">
                  <span className="grid size-10 place-items-center rounded-xl border border-line-strong bg-navy-900 text-cyan">
                    <Icon name={family.icon} className="size-5" />
                  </span>
                  <div>
                    <h4 className="font-display text-lg font-medium text-ink">{family.label}</h4>
                    <p className="mt-1 text-sm text-ink-muted">{family.description}</p>
                  </div>
                  <ul className="mt-auto grid gap-2">
                    {family.tools.map((tool) => (
                      <li key={tool} className="border-l border-cyan/40 pl-3">
                        <p className="text-sm font-medium text-ink">{tool}</p>
                        {technologyRoles[tool] && <p className="text-xs text-ink-muted">{technologyRoles[tool]}</p>}
                      </li>
                    ))}
                  </ul>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-20">
        <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">Accès distant sécurisé</h3>
        <div className="mt-6">
          <FlowSteps steps={vpnFlow} label="Accès distant sécurisé : de l’utilisateur aux services protégés" />
        </div>
        <p className="mt-6 text-sm text-ink-subtle">
          Schéma de principe : aucune adresse, configuration ni règle d’accès n’est publiée.
        </p>
      </div>
    </Section>
  )
}
