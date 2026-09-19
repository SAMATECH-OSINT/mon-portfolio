import { Section } from '@/components/layout/Section'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Pending } from '@/components/ui/Pending'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { certifications } from '@/data/certifications'
import { education } from '@/data/education'
import { isTodo } from '@/data/types'
import { displayValue } from '@/lib/display'

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
        <div className="lg:col-span-7">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">Diplômes & formations</h3>
          <ul className="mt-5 grid gap-3">
            {education.map((item, index) => (
              <li key={item.id}>
                <Reveal delay={index * 0.06}>
                  <Card interactive compact className="flex items-start gap-4 sm:gap-5 sm:p-5">
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-navy-900 text-gold">
                      <Icon name="graduation" className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                        <h4 className="font-display text-base font-medium text-ink sm:text-lg">{item.title}</h4>
                        {isTodo(item.year) ? (
                          <Pending />
                        ) : (
                          <Badge variant="gold">{displayValue(item.year)}</Badge>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm text-ink-muted">
                        {isTodo(item.institution) ? <Pending /> : item.institution}
                      </p>
                    </div>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">Certifications</h3>
          <ul className="mt-5 grid gap-3">
            {certifications.map((item) => (
              <li key={item.id}>
                <Reveal delay={0.1}>
                  <Card interactive compact className="sm:p-5">
                    <div className="flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-gold/40 bg-gold/[0.06] text-gold">
                        <Icon name="award" className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-display text-base font-medium text-ink sm:text-lg">{item.title}</h4>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {isTodo(item.year) ? <Pending /> : <Badge variant="gold">{displayValue(item.year)}</Badge>}
                          <span className="text-sm text-ink-muted">
                            {isTodo(item.issuer) ? <Pending /> : item.issuer}
                          </span>
                        </div>
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
