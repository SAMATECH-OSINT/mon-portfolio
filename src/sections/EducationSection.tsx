import { Section } from '@/components/layout/Section'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { certifications } from '@/data/certifications'
import { education } from '@/data/education'
import { isTodo } from '@/data/types'

export function EducationSection() {
  return (
    <Section id="education">
      <SectionHeading
        id="education"
        eyebrow="Formation"
        title="Formations & certifications"
        description="Réseaux, cybersécurité, ingénierie des données et intelligence artificielle."
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">Diplômes</h3>
          <ul className="mt-5 grid gap-3">
            {education.map((item, index) => (
              <li key={item.id}>
                <Reveal delay={index * 0.06}>
                  <Card interactive compact className="flex items-start gap-4 sm:gap-5 sm:p-5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-navy-900 text-gold">
                      <Icon name="graduation" className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                        <h4 className="font-display text-base font-medium text-ink sm:text-lg">{item.title}</h4>
                        {!isTodo(item.year) && <Badge variant="gold">{item.year}</Badge>}
                      </div>
                      {!isTodo(item.institution) && (
                        <p className="mt-1.5 text-sm text-ink-muted">{item.institution}</p>
                      )}
                    </div>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">
            Formations & certifications spécialisées
          </h3>
          <ul className="mt-5 grid gap-3">
            {certifications.map((item, index) => (
              <li key={item.id}>
                <Reveal delay={index * 0.06}>
                  <Card interactive compact className="sm:p-5">
                    <div className="flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-gold/40 bg-gold/6 text-gold">
                        <Icon name="award" className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                          <p className="font-mono text-[0.7rem] uppercase tracking-widest text-cyan">{item.domain}</p>
                          {!isTodo(item.year) && <Badge variant="gold">{item.year}</Badge>}
                        </div>
                        <h4 className="mt-1.5 font-display text-base font-medium text-ink">{item.title}</h4>
                        {!isTodo(item.issuer) && <p className="mt-1 text-sm text-ink-muted">{item.issuer}</p>}
                        {item.description && <p className="mt-2 text-sm text-ink-muted">{item.description}</p>}
                        {!isTodo(item.credentialUrl) && (
                          <a
                            href={item.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-block text-sm font-medium text-cyan hover:underline"
                          >
                            Voir l’attestation
                          </a>
                        )}
                      </div>
                    </div>
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
