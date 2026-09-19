import { TODO } from './types'
import type { Maybe } from './types'

/**
 * Modèle d'étude de cas :
 * Context → Problem → Solution → Architecture → Technologies → Data → Security → Results / Impact.
 *
 * - Couche « synthèse » (toujours affichée si renseignée) : context, summary, scope, technologies, links.
 * - Couche « détail » (problem, solution, architecture, data, security, result) : affichée uniquement si
 *   `publicationValidated` est vrai — elle peut toucher à des informations institutionnelles.
 * - Une valeur `TODO` n'est jamais affichée. Ne jamais inventer un résultat ou une métrique.
 */
export interface Project {
  id: string
  title: string
  /** Contexte / cadre du projet. */
  context: Maybe<string>
  /** Synthèse d'une phrase (source : CV). */
  summary: Maybe<string>
  /** Périmètre : mots-clés fonctionnels et méthodologiques. */
  scope: readonly string[]
  technologies: readonly string[]
  problem: Maybe<string>
  solution: Maybe<string>
  architecture: Maybe<string>
  data: Maybe<string>
  security: Maybe<string>
  /** Résultats / impact : `TODO` tant qu'ils ne sont pas validés. */
  result: Maybe<string>
  links: {
    demo: Maybe<string>
    repository: Maybe<string>
  }
  /** `false` : seule la synthèse est publique (projets institutionnels non validés pour publication). */
  publicationValidated: boolean
}

const noDetails = {
  problem: TODO,
  solution: TODO,
  architecture: TODO,
  data: TODO,
  security: TODO,
  result: TODO,
  links: { demo: TODO, repository: TODO },
} as const

export const projects: readonly Project[] = [
  {
    id: 'accidents-routiers',
    title: 'Système intelligent d’analyse des accidents de la route au Sénégal',
    context: 'Projet technique appliqué',
    summary: 'De la donnée au tableau de bord d’aide à la décision : analyse des accidents de la route.',
    scope: [
      'Data Engineering',
      'Data Analysis',
      'Bases de données',
      'Cartographie / SIG',
      'Machine Learning',
      'Visualisation',
      'Tableaux de bord d’aide à la décision',
    ],
    technologies: ['Python', 'PostgreSQL', 'PostGIS', 'Streamlit', 'Machine Learning', 'Plotly'],
    ...noDetails,
    publicationValidated: false,
  },
  {
    // Nom interne d'origine : « SIG-EFFECTIFS GMI » — non publié (institutionnel).
    id: 'si-rh-effectifs',
    title: 'Système d’information RH / gestion des effectifs',
    context: 'Projet institutionnel',
    summary: 'Gestion des personnels et de leurs mouvements, traçabilité et tableau de bord d’aide à la décision.',
    scope: ['Gestion des personnels', 'Mouvements', 'Traçabilité', 'Statistiques', 'Tableaux de bord', 'Sécurité'],
    technologies: ['FastAPI', 'React', 'PostgreSQL', 'JWT'],
    ...noDetails,
    publicationValidated: false,
  },
  {
    id: 'prediction-paludisme',
    title: 'Modèle de prédiction du paludisme',
    context: 'En collaboration avec le Ministère de la Santé',
    summary: 'Analyse de données sanitaires, indicateurs et modèles prédictifs.',
    scope: ['Données sanitaires', 'Indicateurs', 'Modèles prédictifs'],
    technologies: ['Machine Learning'],
    ...noDetails,
    publicationValidated: false,
  },
  {
    id: 'declaration-telephones',
    title: 'Système de déclaration des téléphones',
    context: TODO,
    summary: 'Système informatique de gestion et d’exploitation de données.',
    scope: ['Gestion de données', 'Exploitation de données'],
    technologies: [],
    ...noDetails,
    publicationValidated: false,
  },
  {
    id: 'samatech-dhis2-harvest',
    title: 'SAMATECH / DHIS2 HARVEST',
    context: TODO,
    summary: TODO,
    scope: [],
    technologies: ['Django', 'Neo4j', 'DHIS2', 'OCR', 'AI'],
    ...noDetails,
    publicationValidated: false,
  },
  {
    id: 'canal',
    title: 'CANAL',
    context: 'Plateforme sécurisée',
    summary: TODO,
    scope: [],
    technologies: ['FastAPI', 'React', 'PostgreSQL', 'Docker'],
    ...noDetails,
    publicationValidated: false,
  },
]
