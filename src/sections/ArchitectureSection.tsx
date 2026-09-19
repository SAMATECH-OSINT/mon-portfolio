import { ChainExplorer } from '@/components/architecture/ChainExplorer'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { techChain } from '@/data/architecture'

export function ArchitectureSection() {
  return (
    <Section id="architecture">
      <SectionHeading
        id="architecture"
        eyebrow="Architecture"
        title="Architecture & Engineering"
        description="Du réseau à la décision : la donnée traverse une chaîne technique cohérente, sécurisée à chaque étape."
      />
      <div className="mt-14">
        <ChainExplorer steps={techChain} label="Chaîne technique : du réseau à la décision" />
      </div>
    </Section>
  )
}
