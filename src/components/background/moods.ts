import type { SectionId } from '@/data/navigation'
import type { GlowAnchor } from './networkField'

/**
 * Le halo principal du background glisse lentement vers une zone de l'écran
 * différente selon la section visible (position relative au viewport).
 */
const moods: Record<SectionId, GlowAnchor> = {
  home: { x: 0.74, y: 0.36 },
  about: { x: 0.24, y: 0.4 },
  expertise: { x: 0.7, y: 0.55 },
  architecture: { x: 0.5, y: 0.3 },
  cloud: { x: 0.2, y: 0.62 },
  observability: { x: 0.78, y: 0.4 },
  pipelines: { x: 0.35, y: 0.5 },
  projects: { x: 0.6, y: 0.7 },
  experience: { x: 0.18, y: 0.45 },
  education: { x: 0.8, y: 0.5 },
  skills: { x: 0.5, y: 0.5 },
  research: { x: 0.25, y: 0.35 },
  teaching: { x: 0.72, y: 0.6 },
  impact: { x: 0.5, y: 0.45 },
  contact: { x: 0.5, y: 0.7 },
}

export function moodFor(section: string): GlowAnchor {
  return moods[section as SectionId] ?? moods.home
}
