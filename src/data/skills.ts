import { dataModels } from './dataModels'
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
 * Positionnement officiel de chaque technologie : formulation unique, reprise partout
 * (matrice de compétences, architectures). Wazuh est une plateforme SIEM / XDR :
 * « SIEM » n'est jamais affiché comme un produit distinct.
 */
export const technologyRoles: Readonly<Record<string, string>> = {
  pfSense: 'Firewall / Network Security',
  Suricata: 'IDS / IPS',
  OpenVPN: 'VPN / Secure Access',
  Wazuh: 'SIEM / XDR open source',
  TheHive: 'Incident Response / Case Management',
  ELK: 'Logs / Search / Visualization',
  Elasticsearch: 'Logs / Search',
  Kibana: 'Visualization',
  OpenSearch: 'Search / Analytics / Observability',
  Grafana: 'Monitoring / Visualization',
  AWS: 'Cloud Provider',
  Hostinger: 'Hosting / Infrastructure',
  VPS: 'Infrastructure',
  Render: 'Cloud Application Deployment / Hosting',
  Neon: 'PostgreSQL Cloud',
  Cloudflare: 'Edge / DNS / Security',
  'Cloudflare R2': 'Object Storage',
  Docker: 'Containerization',
  Dokploy: 'Deployment / Application Management',
}

/**
 * Ordre = fil conducteur du portfolio :
 * Network & Security → Cloud → DevOps → Data → Databases → Big Data → AI → Development.
 * Aucun niveau de maîtrise n'est affiché : seuls les périmètres fournis figurent ici.
 */
export const skillDomains: readonly SkillDomain[] = [
  {
    id: 'security',
    label: 'Cybersecurity',
    title: 'Cybersecurity & Network Security',
    icon: 'shield',
    summary:
      'Réseaux sécurisés, détection, investigation et réponse aux incidents, avec Wazuh — SIEM / XDR open source — au cœur de la supervision.',
    focus: [
      'Sécurité des systèmes',
      'Sécurité réseau',
      'SOC',
      'Digital forensics',
      'Audit de sécurité',
      'Analyse des vulnérabilités',
      'RBAC / contrôle d’accès',
      'Chiffrement AES-256',
      'OSINT',
      'Renseignement numérique',
      'Administration réseaux',
      'Virtualisation',
      'Infrastructure sécurisée',
      'Déploiement de sites',
    ],
    technologies: [
      'Cisco',
      'Aruba',
      'Fortinet',
      'pfSense',
      'TCP/IP',
      'WAN/LAN',
      'DNS',
      'DHCP',
      'Motorola P25',
      'Faisceaux hertziens',
      'Linux',
      'Windows',
      'Suricata',
      'OpenVPN',
      'Wazuh',
      'TheHive',
      'ELK',
      'Elasticsearch',
      'Kibana',
      'OpenSearch',
      'Grafana',
    ],
    groups: [
      { label: 'Network Security / Firewall', items: ['Cisco', 'Aruba', 'Fortinet', 'pfSense', 'TCP/IP', 'WAN/LAN'] },
      { label: 'Réseaux, télécoms & systèmes', items: ['DNS', 'DHCP', 'Motorola P25', 'Faisceaux hertziens', 'Linux', 'Windows'] },
      { label: 'Détection · Accès · Réponse', items: ['Suricata', 'OpenVPN', 'Wazuh', 'TheHive'] },
      { label: 'Logs & Security Monitoring', items: ['ELK', 'Elasticsearch', 'Kibana', 'OpenSearch', 'Grafana'] },
    ],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    title: 'Cloud & Infrastructure',
    icon: 'cloud',
    summary: 'Héberger, sécuriser l’accès et stocker : de l’infrastructure serveur aux plateformes Cloud managées.',
    focus: ['Infrastructure Cloud', 'Reverse proxy', 'DNS', 'SSL/TLS', 'Stockage objet', 'Monitoring'],
    technologies: ['AWS', 'Render', 'Neon', 'Cloudflare', 'Cloudflare R2', 'MinIO', 'Hostinger', 'VPS', 'Linux'],
    groups: [
      { label: 'Cloud provider & plateformes managées', items: ['AWS', 'Render', 'Neon'] },
      { label: 'Hosting / Infrastructure', items: ['Hostinger', 'VPS', 'Linux'] },
      { label: 'Edge & stockage objet', items: ['Cloudflare', 'Cloudflare R2', 'MinIO'] },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    title: 'DevOps & Deployment',
    icon: 'boxes',
    summary: 'Conteneuriser et déployer des applications de façon reproductible, du serveur à la mise en ligne.',
    focus: ['Conteneurisation', 'Déploiement', 'CI/CD'],
    technologies: ['Docker', 'Dokploy', 'Git', 'CI/CD'],
    groups: [
      { label: 'Containerization', items: ['Docker'] },
      { label: 'Deployment / Application Management', items: ['Dokploy'] },
      { label: 'Versioning & delivery', items: ['Git', 'CI/CD'] },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    title: 'Data Engineering',
    icon: 'workflow',
    summary: 'Ingestion, transformation et traitement de la donnée, du fichier brut au flux distribué.',
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
    technologies: ['Python', 'Pandas', 'NumPy', 'ETL', 'Apache NiFi', 'Apache Kafka', 'Apache Spark', 'Power BI'],
    groups: [
      { label: 'Langages & traitement', items: ['Python', 'Pandas', 'NumPy'] },
      { label: 'Pipelines & traitement distribué', items: ['ETL', 'Apache NiFi', 'Apache Kafka', 'Apache Spark'] },
      { label: 'Visualisation', items: ['Power BI'] },
    ],
  },
  {
    id: 'databases',
    label: 'Databases',
    title: 'Databases / Data Management',
    icon: 'database',
    summary: 'Trois modèles de données : relationnel, document et graphe.',
    focus: ['SQL', 'NoSQL', 'Database Engineering', 'Data Modeling'],
    technologies: ['PostgreSQL', 'MySQL', 'SQLite', 'PostGIS', 'MongoDB', 'Neo4j'],
    groups: [
      { label: 'Relationnel · SQL', items: [...(dataModels[0]?.technologies ?? []), 'PostGIS'] },
      { label: 'Document · NoSQL', items: dataModels[1]?.technologies ?? [] },
      { label: 'Graph · NoSQL', items: dataModels[2]?.technologies ?? [] },
    ],
  },
  {
    id: 'bigdata',
    label: 'Big Data',
    title: 'Big Data & Observability',
    icon: 'layers',
    summary: 'Traitement distribué, streaming, pipelines de données, logs et observabilité.',
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
      'ELK',
      'Kibana',
      'Grafana',
    ],
    groups: [
      { label: 'Traitement distribué & streaming', items: ['Apache Spark', 'Apache Kafka', 'Apache NiFi'] },
      { label: 'Logs / Search', items: ['Elasticsearch', 'OpenSearch', 'ELK'] },
      { label: 'Visualization', items: ['Kibana', 'Grafana'] },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    title: 'AI & Analytics',
    icon: 'brain',
    summary: 'Machine Learning, NLP, LLM et systèmes d’aide à la décision.',
    focus: [
      'Machine Learning',
      'Analyse prédictive',
      'Classification',
      'Clustering',
      'Deep learning',
      'NLP',
      'LLM',
      'OCR',
      'AI agents',
      'Data Visualization',
      'Systèmes d’aide à la décision',
    ],
    technologies: [
      'Python',
      'Pandas',
      'Scikit-learn',
      'Random Forest',
      'XGBoost',
      'PyTorch',
      'OpenCV',
      'LangChain',
      'OpenAI',
      'RAG',
      'Text-to-SQL',
      'Text-to-Cypher',
    ],
    groups: [
      { label: 'Data science', items: ['Python', 'Pandas'] },
      { label: 'Machine Learning', items: ['Scikit-learn', 'Random Forest', 'XGBoost', 'PyTorch', 'OpenCV'] },
      { label: 'NLP · LLM · RAG', items: ['LangChain', 'OpenAI', 'RAG', 'Text-to-SQL', 'Text-to-Cypher'] },
    ],
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
