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
 * Networks → Cybersecurity → Cloud → Data → Databases → Big Data → AI → Development.
 * Aucun niveau de maîtrise n'est affiché : seuls les périmètres fournis figurent ici.
 */
export const skillDomains: readonly SkillDomain[] = [
  {
    id: 'networks',
    label: 'Networks',
    title: 'Réseaux & Infrastructure',
    icon: 'network',
    summary: 'Réseaux, télécommunications et systèmes : des infrastructures sécurisées de bout en bout.',
    focus: ['WAN/LAN', 'Administration réseaux', 'Virtualisation', 'Infrastructure sécurisée', 'Déploiement de sites'],
    technologies: [
      'Cisco',
      'Aruba',
      'Fortinet',
      'TCP/IP',
      'DNS',
      'DHCP',
      'Motorola P25',
      'Faisceaux hertziens',
      'Linux',
      'Windows',
    ],
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
      'Digital forensics',
      'Audit de sécurité',
      'Analyse des vulnérabilités',
      'RBAC / contrôle d’accès',
      'Chiffrement AES-256',
      'OSINT',
      'Renseignement numérique',
      'Monitoring',
    ],
    technologies: ['Wazuh', 'TheHive', 'ELK', 'OpenSearch', 'Fortinet'],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    title: 'Cloud & Deployment',
    icon: 'cloud',
    summary:
      'De l’infrastructure au déploiement : héberger, conteneuriser, déployer et exploiter des applications et des données.',
    focus: [
      'Infrastructure Cloud',
      'Conteneurisation',
      'Déploiement',
      'Reverse proxy',
      'DNS',
      'SSL/TLS',
      'Stockage objet',
      'CI/CD',
      'Monitoring',
    ],
    technologies: [
      'AWS',
      'Cloudflare',
      'Cloudflare R2',
      'Render',
      'Neon',
      'Hostinger',
      'VPS',
      'Docker',
      'Dokploy',
      'MinIO',
      'Linux',
    ],
    groups: [
      { label: 'Hosting / Infrastructure', items: ['Hostinger', 'VPS', 'Linux'] },
      { label: 'Containerization', items: ['Docker'] },
      { label: 'Deployment / DevOps', items: ['Dokploy', 'Docker'] },
      { label: 'Cloud & Edge', items: ['AWS', 'Render', 'Neon', 'Cloudflare', 'Cloudflare R2', 'MinIO'] },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    title: 'Data Engineering',
    icon: 'workflow',
    summary: 'Ingestion, modélisation et traitement de la donnée.',
    focus: [
      'ETL',
      'ELT',
      'Data ingestion',
      'Data pipelines',
      'Data modelling',
      'Data processing',
      'Data Analysis',
      'Data Visualization',
      'APIs',
      'Bases de données',
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'SQL', 'PostgreSQL', 'PostGIS', 'MongoDB', 'Neo4j', 'Power BI', 'ETL'],
  },
  {
    id: 'databases',
    label: 'Databases',
    title: 'Databases / Data Management',
    icon: 'database',
    summary: 'Trois modèles de données : relationnel, document et graphe.',
    focus: ['SQL', 'NoSQL', 'Database Engineering', 'Data Modeling'],
    technologies: ['PostgreSQL', 'MySQL', 'SQLite', 'MongoDB', 'Neo4j'],
    groups: [
      { label: 'Relationnel · SQL', items: ['PostgreSQL', 'MySQL', 'SQLite'] },
      { label: 'Document · NoSQL', items: ['MongoDB'] },
      { label: 'Graph · NoSQL', items: ['Neo4j'] },
    ],
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
      'Classification',
      'Clustering',
      'Deep learning',
      'NLP',
      'LLM',
      'Text-to-SQL',
      'Text-to-Cypher',
      'OCR',
      'RAG',
      'AI agents',
      'Systèmes d’aide à la décision',
    ],
    technologies: ['Python', 'Scikit-learn', 'XGBoost', 'PyTorch', 'OpenCV', 'LangChain', 'OpenAI', 'RAG'],
  },
  {
    id: 'development',
    label: 'Development',
    title: 'Développement',
    icon: 'code',
    summary: 'Applications web full stack.',
    focus: ['API'],
    technologies: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'FastAPI',
      'Django',
      'Laravel',
      'PHP',
      'SQLAlchemy',
      'Alembic',
      'Celery',
      'Redis',
    ],
    groups: [
      { label: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'JavaScript'] },
      { label: 'Backend', items: ['FastAPI', 'Django', 'Laravel', 'PHP', 'SQLAlchemy', 'Alembic', 'Celery', 'Redis'] },
    ],
  },
]
