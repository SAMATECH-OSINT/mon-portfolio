import { LayeredFlow } from '@/components/architecture/LayeredFlow'
import { Section } from '@/components/layout/Section'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cloudFlow } from '@/data/architecture'
import { skillDomains } from '@/data/skills'

export function CloudSection() {
  const cloud = skillDomains.find((domain) => domain.id === 'cloud')

  return (
    <Section id="cloud">
      <SectionHeading
        id="cloud"
        eyebrow="Cloud & infrastructure"
        title="Cloud & Deployment"
        description="Du DNS à la base de données : comment le CDN, l’hébergement, l’API et le stockage s’assemblent pour déployer une application."
        align="center"
      />

      <div className="mx-auto mt-14 max-w-4xl">
        <LayeredFlow rows={cloudFlow} label="Architecture de déploiement Cloud" />
      </div>

      {cloud && (
        <Reveal className="mx-auto mt-14 max-w-4xl">
          <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">
            Compétences infrastructure
          </p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {[...cloud.focus, ...cloud.technologies.filter((tech) => !cloud.focus.includes(tech))].map((item) => (
              <li key={item}>
                <Badge variant="accent">{item}</Badge>
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </Section>
  )
}
