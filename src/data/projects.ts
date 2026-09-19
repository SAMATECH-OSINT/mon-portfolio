import { TODO } from './types'
import type { Maybe } from './types'

export interface Project {
  id: string
  title: string
  /** Contexte / organisation. */
  context: Maybe<string>
  /** Case study : Problem → Architecture → Technologies → Solution → Résultat. */
  problem: Maybe<string>
  architecture: Maybe<string>
  technologies: readonly string[]
  solution: Maybe<string>
  /** Ne jamais inventer un résultat : `TODO` tant qu'il n'est pas validé. */
  result: Maybe<string>
  /** Fonctionnalités confirmées. */
  features: readonly string[]
  links: {
    demo: Maybe<string>
    repository: Maybe<string>
  }
  /**
   * `false` tant que Mamadou Sarr n'a pas validé ce qui peut être publié
   * (les projets liés à des organisations sensibles restent génériques).
   */
  publicationValidated: boolean
}

export const projects: readonly Project[] = [
  {
    id: 'accidents-routiers',
    title: 'Système Intelligent d’Analyse des Accidents Routiers',
    context: TODO,
    problem: TODO,
    architecture: TODO,
    technologies: ['Python', 'PostgreSQL', 'PostGIS', 'Streamlit', 'Machine Learning', 'Plotly'],
    solution: TODO,
    result: TODO,
    features: [],
    links: { demo: TODO, repository: TODO },
    publicationValidated: false,
  },
  {
    id: 'sig-effectifs-gmi',
    title: 'SIG-EFFECTIFS GMI',
    context: TODO,
    problem: TODO,
    architecture: TODO,
    technologies: ['FastAPI', 'React', 'PostgreSQL', 'JWT'],
    solution: TODO,
    result: TODO,
    features: [
      'Gestion des personnels',
      'Mouvements',
      'Statistiques',
      'Tableaux de bord',
      'Sécurité',
    ],
    links: { demo: TODO, repository: TODO },
    publicationValidated: false,
  },
  {
    id: 'samatech-dhis2-harvest',
    title: 'SAMATECH / DHIS2 HARVEST',
    context: TODO,
    problem: TODO,
    architecture: TODO,
    technologies: ['Django', 'Neo4j', 'DHIS2', 'OCR', 'AI'],
    solution: TODO,
    result: TODO,
    features: [],
    links: { demo: TODO, repository: TODO },
    publicationValidated: false,
  },
  {
    id: 'canal',
    title: 'CANAL',
    context: 'Plateforme sécurisée',
    problem: TODO,
    architecture: TODO,
    technologies: ['FastAPI', 'React', 'PostgreSQL', 'Docker'],
    solution: TODO,
    result: TODO,
    features: [],
    links: { demo: TODO, repository: TODO },
    publicationValidated: false,
  },
]
