import type { IconKey } from './types'

interface SkillGroup {
  label: string
  items: readonly string[]
}

export interface SkillDomain {
  id: string
  label: string
  /** Intitulé long pour les cartes d'expertise. */
  title: string
  icon: IconKey
  summary: string
  /** Périmètres et concepts. */
  focus: readonly string[]
  technologies: readonly string[]
  /** Sous-groupes de technologies (ex. Frontend / Backend). */
  groups?: readonly SkillGroup[]
}

/**
 * Ordre = progression du portfolio :
 * Networks → Cybersecurity → Cloud → Data → Big Data → AI → Development.
 * Aucun niveau de maîtrise n'est affiché : seuls les périmètres fournis figurent ici.
 */
export const skillDomains: readonly SkillDomain[] = [
  {
    id: 'networks',
    label: 'Networks',
    title: 'Réseaux & Infrastructure',
    icon: 'network',
    summary: 'Infrastructures réseau et systèmes sécurisées.',
    focus: ['WAN/LAN', 'Linux', 'Virtualisation', 'Infrastructure sécurisée'],
    technologies: ['Cisco', 'Aruba', 'Fortinet'],
  },
  {
    id: 'cybersecurity',
    label: 'Cybersecurity',
    title: 'Cybersécurité',
    icon: 'shield',
    summary: 'Sécurité des systèmes, détection et investigation.',
    focus: [
      'Sécurité des systèmes',
      'SOC',
      'Forensic',
      'Audit',
      'Renseignement numérique',
      'Monitoring',
    ],
    technologies: ['Wazuh', 'TheHive', 'ELK', 'OpenSearch', 'Fortinet'],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    title: 'Cloud & Infrastructure',
    icon: 'cloud',
    summary: 'Déploiement et exploitation d’applications et de données sur des infrastructures Cloud et VPS.',
    focus: [
      'VPS',
      'Linux',
      'Docker',
      'Déploiement',
      'Reverse proxy',
      'DNS',
      'SSL/TLS',
      'Stockage objet',
      'Infrastructure Cloud',
      'CI/CD',
      'Monitoring',
    ],
    technologies: ['AWS', 'Cloudflare', 'Cloudflare R2', 'Render', 'Neon', 'VPS', 'Docker', 'Linux'],
  },
  {
    id: 'data',
    label: 'Data',
    title: 'Data Engineering',
    icon: 'database',
    summary: 'Ingestion, modélisation et traitement de la donnée.',
    focus: [
      'ETL',
      'ELT',
      'Data ingestion',
      'Data pipelines',
      'Data modelling',
      'Data processing',
      'APIs',
      'Bases de données',
    ],
    technologies: ['Python', 'Pandas', 'SQL', 'PostgreSQL', 'PostGIS', 'Neo4j', 'ETL'],
  },
  {
    id: 'bigdata',
    label: 'Big Data',
    title: 'Big Data & Distributed Data Processing',
    icon: 'layers',
    summary: 'Ingestion, traitement distribué, pipelines de données et observabilité.',
    focus: [
      'Traitement distribué',
      'Batch processing',
      'Streaming',
      'Data lake',
      'Ingestion',
      'ETL / ELT',
      'Pipelines de données',
      'Logs',
      'Observability',
    ],
    technologies: [
      'Apache Spark',
      'Apache Kafka',
      'Apache NiFi',
      'Elasticsearch',
      'OpenSearch',
      'Kibana',
      'Grafana',
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    title: 'Artificial Intelligence',
    icon: 'brain',
    summary: 'Machine Learning, LLM et systèmes d’aide à la décision.',
    focus: [
      'Machine Learning',
      'Analyse prédictive',
      'LLM',
      'RAG',
      'AI agents',
      'Systèmes d’aide à la décision',
    ],
    technologies: ['Python', 'Scikit-learn', 'OpenAI', 'RAG'],
  },
  {
    id: 'development',
    label: 'Development',
    title: 'Développement',
    icon: 'code',
    summary: 'Applications web full stack.',
    focus: [],
    technologies: ['React', 'TypeScript', 'JavaScript', 'FastAPI', 'Django', 'Laravel', 'PHP'],
    groups: [
      { label: 'Frontend', items: ['React', 'TypeScript', 'JavaScript'] },
      { label: 'Backend', items: ['FastAPI', 'Django', 'Laravel', 'PHP'] },
    ],
  },
]
