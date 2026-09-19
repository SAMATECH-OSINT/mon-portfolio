import type { IconKey } from './types'

export interface ResearchAxis {
  id: string
  label: string
  icon: IconKey
}

/** TODO : publications et travaux de recherche — aucun n'est renseigné ; la section n'en affiche pas tant qu'il n'y en a pas. */
export const researchAxes: readonly ResearchAxis[] = [
  { id: 'data-governance', label: 'Gouvernance des données', icon: 'scale' },
  { id: 'ai', label: 'Intelligence artificielle', icon: 'brain' },
  { id: 'cybersecurity', label: 'Cybersécurité', icon: 'shield' },
  { id: 'digital-transformation', label: 'Transformation numérique', icon: 'workflow' },
  { id: 'open-data', label: 'Données publiques', icon: 'landmark' },
  { id: 'decision-support', label: 'Systèmes d’aide à la décision', icon: 'target' },
  { id: 'data-driven-governance', label: 'Data-driven governance', icon: 'globe' },
  { id: 'cloud-data-platforms', label: 'Cloud & Data Platforms', icon: 'cloud' },
]
