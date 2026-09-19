import { Section } from '@/components/layout/Section'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { teachingGroups, teachingPosts } from '@/data/teaching'

export function TeachingSection() {
  return (
    <Section id="teaching">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="teaching"
            eyebrow="Enseignement"
            title="Transmettre le numérique"
            description="Formateur à l’École Nationale de Police et enseignant vacataire à l’ISM de Thiès : bases de données, technologies Web et cybercriminalité."
          />

          <ul className="mt-10 grid gap-3">
            {teachingPosts.map((post, index) => (
              <li key={post.id}>
                <Reveal delay={index * 0.08}>
                  <Card interactive compact className="sm:p-5">
                    <div className="flex items-start gap-4">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-line-strong bg-navy-900 text-cyan">
                        <Icon name="book" className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-1">
                          <h3 className="font-display text-base font-medium text-ink">{post.institution}</h3>
                          <Badge variant="accent">{post.status}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-ink-muted">{post.role}</p>
                        <ul className="mt-3 flex flex-wrap gap-1.5">
                          {post.topics.map((topic) => (
                            <li key={topic}>
                              <Badge>{topic}</Badge>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid content-start gap-8 lg:col-span-7">
          {teachingGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.08}>
              <section aria-labelledby={`teaching-${group.id}`}>
                <h3
                  id={`teaching-${group.id}`}
                  className="border-b border-line pb-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle"
                >
                  {group.label}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Badge variant={group.id === 'core' ? 'accent' : 'tech'}>{item}</Badge>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
