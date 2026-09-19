import { TODO } from './types'
import type { Maybe } from './types'

/**
 * Modèle d'étude de cas :
 * Contexte → Problématique → Solution → Architecture → Données → Technologies → Sécurité
 * → Analyse / IA → Résultats ou usages → Aide à la décision.
 *
 * - Une section sans donnée vérifiée n'est jamais affichée (`TODO`, chaîne vide, tableau vide).
 * - Les sections « détail » (problem, solution, architecture, security, outcome, extras, features)
 *   ne sont publiées que si `publicationValidated` est vrai.
 * - Ne jamais inventer un résultat, une métrique, un client ou une technologie.
 *   Les chiffres affichés (`figures`) sont explicitement validés par Mamadou Sarr.
 * - Aucun détail opérationnel sensible : schémas conceptuels uniquement.
 */

/** Texte, ou liste à puces. */
export type ProjectContent = Maybe<string> | readonly string[]

export const projectCategories = ['Data & IA', 'Sécurité', 'Systèmes d’information', 'Cloud & Déploiement'] as const
export type ProjectCategory = (typeof projectCategories)[number]

export interface Project {
  id: string
  title: string
  /** Rubriques du filtre. */
  categories: readonly ProjectCategory[]
  /** Contexte / cadre du projet. */
  context: Maybe<string>
  /** Description validée. */
  summary: Maybe<string>
  /** Signature du projet. */
  tagline: Maybe<string>
  /** Chiffres explicitement validés. */
  figures: readonly { value: string; label: string }[]
  /** Mots-clés mis en avant. */
  highlights: readonly string[]
  problem: ProjectContent
  solution: ProjectContent
  features: readonly string[]
  /** Flux d'architecture conceptuel, dans l'ordre. Vide = pas de schéma. */
  architecture: readonly string[]
  data: ProjectContent
  technologies: readonly string[]
  security: ProjectContent
  /** Analyse / IA. */
  analysis: ProjectContent
  /** Rubriques propres au projet (ex. Workflow RH, Déploiement Cloud). */
  extras: readonly { label: string; content: ProjectContent }[]
  /** Résultats ou usages. */
  outcome: ProjectContent
  decision: ProjectContent
  links: {
    demo: Maybe<string>
    repository: Maybe<string>
  }
  publicationValidated: boolean
}

const blank = {
  context: TODO,
  summary: TODO,
  tagline: TODO,
  figures: [],
  highlights: [],
  problem: TODO,
  solution: TODO,
  features: [],
  architecture: [],
  data: TODO,
  technologies: [],
  security: TODO,
  analysis: TODO,
  extras: [],
  outcome: TODO,
  decision: TODO,
  links: { demo: TODO, repository: TODO },
} as const

export const projects: readonly Project[] = [
  {
    ...blank,
    id: 'accidents-routiers',
    title: 'Système intelligent d’analyse des accidents de la route au Sénégal',
    categories: ['Data & IA'],
    context: 'Projet technique appliqué',
    summary:
      'Bien plus qu’un tableau de bord statistique : on pose une question en langage naturel et on obtient une réponse claire, accompagnée de la visualisation adaptée.',
    highlights: [
      'NLP',
      'LLM',
      'Text-to-SQL',
      'PostgreSQL',
      'Data Analytics',
      'Data Visualization',
      'Decision Support',
      'Cartographie / SIG',
      'Machine Learning',
    ],
    problem:
      'Interroger directement les données d’accidents de la route en langage naturel, au-delà d’un simple tableau de bord statistique.',
    solution:
      'Une interface d’analyse en langage naturel : la question est comprise et son intention analytique identifiée, transformée en requête SQL, exécutée sur PostgreSQL, puis les résultats sont interprétés par un LLM.',
    architecture: ['Utilisateur', 'NLP / LLM', 'SQL', 'PostgreSQL', 'Résultats', 'LLM', 'Réponse + Graphique'],
    data: 'Base PostgreSQL avec extension géospatiale PostGIS (cartographie / SIG).',
    technologies: ['Python', 'PostgreSQL', 'PostGIS', 'Streamlit', 'Plotly', 'Machine Learning'],
    analysis:
      'Compréhension de la question et identification de l’intention analytique (NLP / LLM), génération SQL, interprétation des résultats par le LLM et choix du type de graphique selon l’intention de la question.',
    outcome: 'Réponse textuelle claire et visualisation présentées simultanément.',
    decision: 'Transformer les données d’accidents en informations exploitables pour la décision.',
    publicationValidated: true,
  },
  {
    ...blank,
    id: 'declaration-telephones',
    title: 'Système de déclaration et d’analyse des téléphones',
    categories: ['Data & IA', 'Systèmes d’information'],
    context: 'Projet technique appliqué',
    summary:
      'Déclarer un téléphone perdu ou volé, retrouver et exploiter les données enregistrées, puis les analyser pour éclairer la décision.',
    highlights: ['Data Management', 'Search', 'Analytics', 'Dashboards', 'Decision Support'],
    problem: 'Exploiter les déclarations de téléphones perdus ou volés au-delà de leur simple enregistrement.',
    solution:
      'Enregistrement d’une déclaration selon le cas (téléphone perdu ou volé), recherches et requêtes sur les données enregistrées, puis analyse statistique.',
    architecture: [
      'Déclaration',
      'Base de données',
      'Recherche / Requêtes',
      'Analyse',
      'Tableaux de bord',
      'Aide à la décision',
    ],
    data: 'Déclarations de téléphones perdus ou volés.',
    analysis:
      'Analyse statistique des types de vols, des moyens et modes utilisés, des lieux, des heures et des régions les plus concernés, ainsi que des tendances et récurrences.',
    outcome: 'Deux types de déclarations (perdu, volé), avec recherche et exploitation des données enregistrées.',
    decision: 'Transformer les données enregistrées en information exploitable pour l’aide à la décision.',
    publicationValidated: true,
  },
  {
    ...blank,
    id: 'canal-securise',
    title: 'CANAL SÉCURISÉ',
    categories: ['Sécurité', 'Systèmes d’information', 'Cloud & Déploiement'],
    context: 'Plateforme web institutionnelle',
    summary:
      'Plateforme web conçue pour sécuriser la transmission de documents et d’informations institutionnelles au sein de structures administratives.',
    tagline: 'Une administration connectée, plus sûre, plus efficace.',
    figures: [
      { value: '20', label: 'structures institutionnelles' },
      { value: '41', label: 'comptes du socle initial' },
    ],
    highlights: ['Confidentialité', 'Intégrité', 'Traçabilité', 'Collaboration interstructures', 'RBAC', 'AES-256'],
    solution:
      'Créer → chiffrer → transmettre → recevoir → consulter → tracer les documents, avec des règles d’accès fondées sur les utilisateurs, les structures, les rôles et les habilitations.',
    architecture: [
      'Utilisateur',
      'Auth / RBAC',
      'Chiffrement AES-256',
      'Stockage',
      'Transmission',
      'Réception',
      'Audit / Traçabilité',
    ],
    data: 'Stockage des documents chiffrés.',
    technologies: [
      'React / TypeScript',
      'FastAPI / Python',
      'PostgreSQL / Neon',
      'Cloudflare R2',
      'JWT',
      'AES-256',
      'HTTPS / TLS',
      'Journalisation / audit',
    ],
    security: [
      'Chiffrement AES-256',
      'HTTPS / TLS',
      'Authentification JWT',
      'Contrôle d’accès RBAC : utilisateurs, structures, rôles, habilitations',
      'Journalisation et audit',
      'Traçabilité des opérations',
    ],
    extras: [
      {
        label: 'Objectif',
        content:
          'Proposer une alternative institutionnelle aux canaux génériques afin d’améliorer la confidentialité, l’intégrité, la traçabilité et la collaboration interstructures.',
      },
    ],
    publicationValidated: true,
  },
  {
    // Nom interne d'origine : « SIG-EFFECTIFS GMI » — non publié.
    ...blank,
    id: 'sirh',
    title: 'SIRH — Système d’Information des Ressources Humaines',
    categories: ['Systèmes d’information', 'Sécurité', 'Cloud & Déploiement'],
    context: 'Projet institutionnel',
    summary:
      'Conception et déploiement d’un SIRH institutionnel destiné à la gestion des effectifs, des carrières et des situations administratives.',
    figures: [
      { value: '12 500+', label: 'agents gérés' },
      { value: '595', label: 'tests backend' },
    ],
    highlights: ['RBAC', 'JWT', 'PostgreSQL', 'FastAPI', 'Audit / Traçabilité', 'Tableaux de bord'],
    features: [
      'Gestion des agents',
      'Référentiels',
      'Affectations',
      'Carrières',
      'Formations',
      'Situations RH',
      'Retraite',
      'Cessations',
      'GED',
      'Notifications',
      'Tableaux de bord',
      'Exports',
    ],
    architecture: [
      'Utilisateur',
      'React',
      'API FastAPI',
      'JWT / RBAC',
      'PostgreSQL',
      'Services RH',
      'Audit / Dashboard',
    ],
    data: [
      'Gestion de plus de 12 500 agents',
      'Optimisation des requêtes',
      'Indexation PostgreSQL',
      'Réduction des traitements N+1',
    ],
    technologies: ['FastAPI', 'React / TypeScript', 'PostgreSQL', 'SQLAlchemy', 'Alembic', 'JWT'],
    security: [
      'RBAC',
      'Gestion des périmètres Région / Département / Collectivité',
      'Séparation des rôles',
      'Contrôle et validation des agents',
      'Traçabilité / audit',
      'Protection des données sensibles',
    ],
    analysis: 'Architecture préparée pour l’exploitation analytique et l’aide à la décision.',
    extras: [
      {
        label: 'Workflow RH',
        content: 'Création → Contrôle → Validation, avec règles de périmètre et séparation des responsabilités.',
      },
      {
        label: 'Déploiement Cloud',
        content: ['Neon PostgreSQL + Render', 'API HTTPS', 'CORS', 'Gestion des secrets', 'Sauvegardes'],
      },
      {
        label: 'Industrialisation',
        content: [
          '595 tests backend',
          'Migrations Alembic',
          'CI / build frontend',
          'Monitoring de santé',
          'Procédures de sauvegarde / restauration',
        ],
      },
    ],
    outcome:
      'Plateforme web institutionnelle déployée en production, avec authentification JWT, base PostgreSQL Cloud et architecture conçue pour l’évolution vers un SIRH multi-périmètres.',
    publicationValidated: true,
  },
  {
    ...blank,
    id: 'samatech-dhis2-harvest',
    title: 'SAMATECH / DHIS2 HARVEST',
    categories: ['Data & IA', 'Cloud & Déploiement'],
    context: 'Suivi épidémiologique du paludisme au Sénégal',
    summary:
      'Conception d’une plateforme intelligente de suivi épidémiologique du paludisme au Sénégal, intégrée à DHIS2, combinant ingestion de données, OCR, contrôle qualité, prédiction et IA conversationnelle.',
    highlights: ['DHIS2', 'ETL', 'OCR', 'Contrôle qualité', 'XGBoost', 'Text-to-Cypher', 'Neo4j'],
    features: [
      'Import et ETL de fichiers CSV/Excel vers Neo4j',
      'Numérisation OCR des formulaires papier DHIS2 avec validation humaine',
      'Contrôle qualité des données',
      'Tableaux de bord et cartographie des indicateurs',
      'Prédictions IA avec XGBoost',
      'Assistant IA « Sory » : interrogation des données en langage naturel grâce au Text-to-Cypher + Neo4j',
    ],
    architecture: ['DHIS2 / CSV / Excel', 'ETL', 'Neo4j', 'Analytics', 'XGBoost / IA', 'Assistant Sory'],
    technologies: [
      'FastAPI',
      'Next.js / React',
      'PostgreSQL',
      'Neo4j',
      'Celery',
      'Redis',
      'MinIO',
      'Docker',
      'DHIS2',
      'OCR / OpenCV',
      'LangChain / LLM',
      'XGBoost',
    ],
    publicationValidated: true,
  },
  {
    ...blank,
    id: 'prediction-paludisme',
    title: 'Modèle de prédiction du paludisme',
    categories: ['Data & IA'],
    context: 'En collaboration avec le Ministère de la Santé',
    summary:
      'Développement d’un modèle de Machine Learning pour la prévision des cas confirmés de paludisme, avec des prévisions mensuelles par district / région sanitaire.',
    highlights: ['Machine Learning', 'XGBoost', 'Prévisions mensuelles', 'District / région sanitaire'],
    architecture: ['Données épidémiologiques', 'Feature Engineering', 'XGBoost', 'Prévisions mensuelles'],
    technologies: ['Python', 'XGBoost', 'Scikit-learn', 'Pandas', 'Machine Learning', 'Data Engineering'],
    analysis:
      'Le modèle XGBoost exploite l’historique des données épidémiologiques et des variables temporelles pour anticiper les tendances.',
    publicationValidated: true,
  },
]

/** Fiche « projet validé » avec schéma d'architecture : affichée en pleine largeur, sur deux colonnes. */
export function isFeatured(project: Project): boolean {
  return project.publicationValidated && project.architecture.length > 0
}
