import type { IconKey } from './types'

export interface PositioningAxis {
  id: string
  label: string
  summary: string
  icon: IconKey
}

/** Les cinq axes du profil (l'ordre est le fil conducteur). */
export const positioningAxes: readonly PositioningAxis[] = [
  {
    id: 'security',
    label: 'Cybersecurity & Network Security',
    summary: 'Réseaux sécurisés, détection, investigation et réponse aux incidents.',
    icon: 'shield',
  },
  {
    id: 'cloud',
    label: 'Cloud & Infrastructure',
    summary: 'Hébergement, conteneurisation et déploiement des applications et des données.',
    icon: 'cloud',
  },
  {
    id: 'data',
    label: 'Data Engineering & Big Data',
    summary: 'Ingestion, ETL, streaming, traitement distribué et bases de données.',
    icon: 'layers',
  },
  {
    id: 'ai',
    label: 'AI / Machine Learning / NLP',
    summary: 'Prédiction, langage naturel, LLM et interrogation intelligente des données.',
    icon: 'brain',
  },
  {
    id: 'decision',
    label: 'Digital Transformation & Decision Support',
    summary: 'Numériser les usages et transformer l’information en aide à la décision.',
    icon: 'target',
  },
]

/** Fil conducteur global. */
export const engineeringThread: readonly string[] = [
  'Network',
  'Security',
  'Infrastructure',
  'Cloud',
  'Data',
  'AI',
  'Decision',
]
