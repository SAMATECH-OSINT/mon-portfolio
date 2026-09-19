import type { IconKey } from './types'

export interface DataModel {
  id: string
  /** Modèle de données. */
  label: string
  /** Famille : SQL ou NoSQL. */
  family: 'SQL' | 'NoSQL'
  icon: IconKey
  technologies: readonly string[]
  description: string
}

export const dataModelsHeadline = 'SQL · NoSQL · Database Engineering · Data Modeling'

/**
 * Les trois modèles de données maîtrisés. Cette représentation décrit des compétences :
 * elle ne rattache aucune base à un projet (voir data/projects.ts pour les usages documentés).
 */
export const dataModels: readonly DataModel[] = [
  {
    id: 'relational',
    label: 'Relational',
    family: 'SQL',
    icon: 'database',
    technologies: ['PostgreSQL', 'MySQL', 'SQLite'],
    description: 'Données structurées, schémas et relations, requêtes SQL et intégrité transactionnelle.',
  },
  {
    id: 'document',
    label: 'Document',
    family: 'NoSQL',
    icon: 'file',
    technologies: ['MongoDB'],
    description: 'Documents flexibles à schéma évolutif, adaptés aux données semi-structurées.',
  },
  {
    id: 'graph',
    label: 'Graph',
    family: 'NoSQL',
    icon: 'network',
    technologies: ['Neo4j'],
    description: 'Entités et relations modélisées sous forme de graphe, interrogées avec Cypher.',
  },
]
