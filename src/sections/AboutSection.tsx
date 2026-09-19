import { ArrowRight } from 'lucide-react'
import { AboutPortrait } from '@/components/about/AboutPortrait'
import { Section } from '@/components/layout/Section'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile } from '@/data/profile'
import { isTodo } from '@/data/types'

export function AboutSection() {
  const paragraphs = profile.about.paragraphs.filter((paragraph) => !isTodo(paragraph))
  const vision = profile.tagline.split(' → ')

  return (
    <Section id="about">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <SectionHeading id="about" eyebrow="À propos" title={profile.about.title} />

          <div className="mt-8 grid gap-5 text-lead text-ink-muted">
            {paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph} delay={0.1 + i * 0.06}>
                <p>{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <ul className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {profile.about.pillars.map((pillar) => (
                <li
                  key={pillar.label}
                  className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-4 transition-colors duration-300 hover:border-cyan/40"
                >
                  <Icon name={pillar.icon} className="size-5 text-cyan" />
                  <span className="text-sm font-medium leading-snug text-ink">{pillar.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.28}>
            <p className="mt-9 mb-3 font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">Vision</p>
            <ol aria-label="Vision" className="flex flex-wrap items-center gap-x-2 gap-y-2 font-display text-base text-ink">
              {vision.map((step, index) => (
                <li key={step} className="flex items-center gap-2">
                  <span className={index === vision.length - 1 ? 'text-gold' : ''}>{step}</span>
                  {index < vision.length - 1 && <ArrowRight className="size-4 text-cyan" aria-hidden />}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-5" delay={0.15}>
          <AboutPortrait />
        </Reveal>
      </div>
    </Section>
  )
}
