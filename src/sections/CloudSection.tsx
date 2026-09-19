import { ChainExplorer } from '@/components/architecture/ChainExplorer'
import { LayeredFlow } from '@/components/architecture/LayeredFlow'
import { Section } from '@/components/layout/Section'
import { Badge } from '@/components/ui/Badge'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { cloudFlow, deliveryChain } from '@/data/architecture'
import { skillDomains } from '@/data/skills'

export function CloudSection() {
  const infrastructure = skillDomains.filter((domain) => domain.id === 'cloud' || domain.id === 'devops')
  const skills = [...new Set(infrastructure.flatMap((domain) => [...domain.focus, ...domain.technologies]))]

  return (
    <Section id="cloud">
      <SectionHeading
        id="cloud"
        eyebrow="Cloud & infrastructure"
        title="Cloud & Deployment"
        description="Développement, conteneurisation, déploiement, hébergement et supervision : la chaîne qui met une application en production."
        align="center"
      />

      <div className="mt-14">
        <h3 className="text-center font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">
          Chaîne de livraison
        </h3>
        <div className="mt-8">
          <ChainExplorer steps={deliveryChain} label="Chaîne de livraison : de l’infrastructure à l’observabilité" />
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-4xl">
        <h3 className="text-center font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">
          Topologie de déploiement
        </h3>
        <div className="mt-8">
          <LayeredFlow rows={cloudFlow} label="Architecture de déploiement Cloud" />
        </div>
        <p className="mt-6 text-center text-sm text-ink-subtle">
          Représentation de référence : chaque projet n’utilise qu’une partie de ces briques.
        </p>
      </div>

      {skills.length > 0 && (
        <Reveal className="mx-auto mt-14 max-w-4xl">
          <p className="text-center font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">
            Compétences infrastructure
          </p>
          <ul className="mt-5 flex flex-wrap justify-center gap-2">
            {skills.map((item) => (
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
