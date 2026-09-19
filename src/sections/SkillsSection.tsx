import { Section } from '@/components/layout/Section'
import { SkillsMatrix } from '@/components/skills/SkillsMatrix'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { skillDomains } from '@/data/skills'

export function SkillsSection() {
  return (
    <Section id="skills">
      <SectionHeading
        id="skills"
        eyebrow="Compétences"
        title="Une matrice de compétences transversale"
        description="Sélectionnez un domaine : les technologies partagées entre domaines révèlent leur complémentarité."
      />
      <div className="mt-14">
        <SkillsMatrix domains={skillDomains} />
      </div>
    </Section>
  )
}
