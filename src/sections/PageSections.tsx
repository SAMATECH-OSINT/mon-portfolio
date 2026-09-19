import { memo } from 'react'
import { AboutSection } from './AboutSection'
import { ArchitectureSection } from './ArchitectureSection'
import { CloudSection } from './CloudSection'
import { ContactSection } from './ContactSection'
import { EducationSection } from './EducationSection'
import { ExperienceSection } from './ExperienceSection'
import { ExpertiseSection } from './ExpertiseSection'
import { HeroSection } from './HeroSection'
import { ImpactSection } from './ImpactSection'
import { ObservabilitySection } from './ObservabilitySection'
import { PipelinesSection } from './PipelinesSection'
import { ProjectsSection } from './ProjectsSection'
import { ResearchSection } from './ResearchSection'
import { SkillsSection } from './SkillsSection'
import { TeachingSection } from './TeachingSection'

/**
 * Enchaînement des sections, dans l'ordre de `sectionOrder` (data/navigation.ts).
 * Mémoïsé : le changement de section active (état de l'App) ne re-rend pas la page.
 */
export const PageSections = memo(function PageSections() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExpertiseSection />
      <ArchitectureSection />
      <CloudSection />
      <PipelinesSection />
      <ObservabilitySection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <SkillsSection />
      <ResearchSection />
      <TeachingSection />
      <ImpactSection />
      <ContactSection />
    </>
  )
})
