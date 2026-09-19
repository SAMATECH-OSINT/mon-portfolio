import { ArrowRight, Mail } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Icon } from '@/components/ui/Icon'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { profile } from '@/data/profile'
import { skillDomains } from '@/data/skills'
import { techChain } from '@/data/valueChain'
import { displayValue } from '@/lib/display'

const palette = [
  { name: 'Deep Navy', token: 'navy-950', hex: '#050B14', className: 'bg-navy-950' },
  { name: 'Dark Blue', token: 'navy-900', hex: '#081426', className: 'bg-navy-900' },
  { name: 'Electric Blue', token: 'electric', hex: '#1677FF', className: 'bg-electric' },
  { name: 'Cyan', token: 'cyan', hex: '#00D9FF', className: 'bg-cyan' },
  { name: 'White', token: 'ink', hex: '#F5F7FA', className: 'bg-ink' },
  { name: 'Gold (accent)', token: 'gold', hex: '#C9A24B', className: 'bg-gold' },
] as const

/**
 * Page de validation du design system (Phase 3).
 * Temporaire : retirée avant la mise en production.
 */
export function StyleGuide() {
  const cyber = skillDomains.find((domain) => domain.id === 'cybersecurity')
  const bigData = skillDomains.find((domain) => domain.id === 'bigdata')

  return (
    <Section id="styleguide" className="border-t border-line">
      <SectionHeading
        id="styleguide"
        eyebrow="Design system · Phase 3"
        title="Fondations visuelles"
        description="Tokens, typographie, composants de base. Cette section sert uniquement à valider le design system."
      />

      <div className="mt-14 grid gap-10">
        {/* Couleurs */}
        <Reveal>
          <h3 className="text-h3">Palette</h3>
          <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {palette.map((color) => (
              <li key={color.token} className="overflow-hidden rounded-xl border border-line">
                <div className={`h-16 ${color.className}`} />
                <div className="bg-surface p-3">
                  <p className="text-sm font-medium">{color.name}</p>
                  <p className="font-mono text-xs text-ink-subtle">{color.hex}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Typographie */}
        <Reveal>
          <h3 className="text-h3">Typographie</h3>
          <div className="mt-5 grid gap-4 rounded-card border border-line bg-surface p-6 sm:p-8">
            <p className="text-display gradient-text font-display font-semibold">{profile.name}</p>
            <p className="text-lead text-ink-muted">{profile.headlines.stack}</p>
            <p className="max-w-2xl text-ink-muted">{profile.heroDescription}</p>
            <p className="eyebrow">Space Grotesk · Inter · JetBrains Mono</p>
          </div>
        </Reveal>

        {/* Boutons & badges */}
        <Reveal>
          <h3 className="text-h3">Boutons & badges</h3>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Button href="#projects" size="lg" iconEnd={<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}>
              Découvrir mes projets
            </Button>
            <Button href="#contact" variant="secondary" size="lg" iconStart={<Mail className="size-4" aria-hidden />}>
              Me contacter
            </Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Désactivé</Button>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <Badge>Wazuh</Badge>
            <Badge variant="accent">Cybersecurity</Badge>
            <Badge variant="gold">Master 2 — 2024</Badge>
            <Badge variant="pending">{displayValue(profile.stats.projects)}</Badge>
          </div>
        </Reveal>

        {/* Cartes */}
        <div>
          <Reveal>
            <h3 className="text-h3">Cartes</h3>
          </Reveal>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {[cyber, bigData].map(
              (domain, index) =>
                domain && (
                  <Reveal key={domain.id} delay={index * 0.1}>
                    <Card interactive className="h-full">
                      <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-navy-900 text-cyan">
                        <Icon name={domain.icon} className="size-5" />
                      </span>
                      <h4 className="mt-5 text-h3">{domain.title}</h4>
                      <p className="mt-2 text-ink-muted">{domain.summary}</p>
                      <ul className="mt-5 flex flex-wrap gap-2">
                        {domain.technologies.map((tech) => (
                          <li key={tech}>
                            <Badge>{tech}</Badge>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  </Reveal>
                ),
            )}
          </div>
        </div>

        {/* Chaîne de valeur : valide la data layer */}
        <Reveal>
          <h3 className="text-h3">Chaîne de valeur (data layer)</h3>
          <ol className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-3">
            {techChain.map((step, index) => (
              <li key={step.id} className="flex items-center gap-2">
                <Badge variant={index === 0 || index === techChain.length - 1 ? 'accent' : 'tech'}>
                  {step.label}
                </Badge>
                {index < techChain.length - 1 && (
                  <ArrowRight className="size-3.5 text-ink-subtle" aria-hidden />
                )}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </Section>
  )
}
