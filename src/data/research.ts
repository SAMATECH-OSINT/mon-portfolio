import type { IconKey } from './types'

export interface ResearchAxis {
  id: string
  label: string
  icon: IconKey
}

/** Intérêts scientifiques généraux. */
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

interface DoctoralProject {
  title: string
  /** Statut tel que validé. */
  status: string
  summary: string
  approach: string
  /** Ce que l'approche vise à permettre. */
  objectives: readonly string[]
  axes: readonly string[]
  /** Approche conceptuelle, dans l'ordre. */
  pipeline: readonly string[]
}

/**
 * Projet doctoral (contenu validé). Ne pas ajouter d'encadrant, d'établissement, de date
 * ni de publication tant qu'ils ne sont pas fournis.
 * TODO : publications et travaux de recherche.
 */
export const doctoralProject: DoctoralProject = {
  title: 'IA pour la sécurité dès la conception — Security-by-Design',
  status: 'Projet de recherche doctoral / Doctoral Research',
  summary:
    'Conception d’un système intelligent d’aide à la sécurité combinant intelligence artificielle, NLP, web sémantique et Knowledge Graphs.',
  approach:
    'L’approche vise à transformer des informations de sécurité hétérogènes et non structurées en connaissances formalisées, structurées et interrogeables.',
  objectives: [
    'Identifier les actifs vulnérables',
    'Analyser les relations entre menaces, vulnérabilités et composants logiciels',
    'Générer des recommandations',
  ],
  axes: [
    'IA / Machine Learning / NLP',
    'Web sémantique',
    'Knowledge Graphs',
    'Ontologies et modèles sémantiques',
    'RDF / OWL / SPARQL',
    'Graph databases / Neo4j',
    'Cybersécurité',
    'Security-by-Design',
    'Vulnerability & Threat Modeling',
    'Automated Reasoning',
    'Systèmes d’aide à la décision',
    'LLM / RAG',
  ],
  pipeline: [
    'Sources de sécurité hétérogènes',
    'NLP / IA',
    'Extraction des connaissances',
    'Ontologies / modèles sémantiques',
    'Knowledge Graph',
    'Analyse des relations',
    'Raisonnement',
    'Identification des vulnérabilités',
    'Recommandations / aide à la décision',
  ],
}
