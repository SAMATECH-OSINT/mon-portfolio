import { Section } from '@/components/layout/Section'
import { Badge } from '@/components/ui/Badge'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { SectionId } from '@/data/navigation'

/** Titres provisoires — supprimés au fur et à mesure de la Phase 6. */
const titles: Record<SectionId, string> = {
  home: 'Accueil (Hero)',
  about: 'À propos',
  expertise: 'Domaines d’expertise',
  architecture: 'Architecture & Engineering',
  cloud: 'Cloud & Deployment',
  observability: 'Observability & Security',
  projects: 'Projets',
  experience: 'Expérience professionnelle',
  education: 'Formations & certifications',
  skills: 'Compétences',
  research: 'Recherche & Interests',
  teaching: 'Enseignement',
  impact: 'From Data to Impact',
  contact: 'Let’s build something meaningful.',
}

interface PlaceholderSectionProps {
  id: SectionId
  phase: string
}

export function PlaceholderSection({ id, phase }: PlaceholderSectionProps) {
  return (
    <Section id={id} className="border-t border-line">
      <SectionHeading id={id} eyebrow="Section à venir" title={titles[id]} />
      <div className="mt-8">
        <Badge variant="pending">{phase}</Badge>
      </div>
    </Section>
  )
}
