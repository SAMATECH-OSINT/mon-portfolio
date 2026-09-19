import { TODO } from './types'
import type { IconKey, Maybe } from './types'

interface Profile {
  name: string
  firstName: string
  lastName: string
  initials: string
  /** Variantes de positionnement, à utiliser selon le contexte. */
  headlines: {
    primary: string
    stack: string
    transformation: string
  }
  /** Sous-titre du Hero, en deux lignes. */
  heroLines: readonly [string, string]
  heroTransformation: string
  heroDescription: string
  /** Micro-indicateurs qualitatifs (aucun chiffre). */
  heroHighlights: ReadonlyArray<{ icon: IconKey; label: string }>
  /** Vision : la chaîne « Infrastructure → … → Impact ». */
  tagline: string
  about: {
    title: string
    paragraphs: readonly string[]
  }
  /** Indicateurs du Hero : aucun chiffre n'est validé à ce stade. */
  stats: {
    yearsExperience: Maybe<string>
    projects: Maybe<string>
    domains: Maybe<string>
  }
  location: Maybe<string>
  /** Chemin vers la photo professionnelle, `TODO` tant qu'elle n'est pas fournie. */
  photo: Maybe<string>
  /** URL publique du site (canonical, Open Graph, JSON-LD). */
  siteUrl: Maybe<string>
}

export const profile: Profile = {
  name: 'Mamadou Sarr',
  firstName: 'Mamadou',
  lastName: 'Sarr',
  initials: 'MS',

  headlines: {
    primary: 'Cybersecurity & Data Engineer',
    stack: 'Cybersecurity · Cloud · Data Engineering · Big Data · AI',
    transformation: 'Digital Transformation & Data/AI Engineer',
  },

  heroLines: ['Cybersecurity · Cloud · Data Engineering', 'Big Data · Artificial Intelligence'],
  heroTransformation: 'Digital Transformation',

  heroHighlights: [
    { icon: 'shield', label: 'Cybersecurity' },
    { icon: 'layers', label: 'Cloud / Data / AI' },
  ],

  heroDescription:
    'Je conçois des systèmes numériques sécurisés, des architectures Cloud et Data et des solutions intelligentes pour transformer les données en décisions.',

  tagline: 'Infrastructure → Data → Intelligence → Décision → Impact',

  about: {
    title: 'Technologie au service d’un impact réel',
    paragraphs: [
      'Mon profil combine cybersécurité, Cloud, Data Engineering, Big Data, intelligence artificielle, réseaux, développement et transformation numérique.',
      TODO,
    ],
  },

  stats: {
    yearsExperience: TODO,
    projects: TODO,
    domains: TODO,
  },

  location: TODO,
  photo: TODO,
  siteUrl: TODO,
}
