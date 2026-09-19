import type { IconKey } from './types'

/**
 * Contenus des diagrammes. Descriptions génériques du rôle de chaque brique :
 * elles ne décrivent aucune architecture interne réelle d'une organisation.
 */
export interface FlowNode {
  id: string
  label: string
  role: string
  icon: IconKey
  technologies: readonly string[]
}

export interface FlowRow {
  id: string
  nodes: readonly FlowNode[]
}

/** NETWORK → CLOUD → DATA INGESTION → ETL → BIG DATA → ANALYTICS → AI → SECURITY → DECISION */
export const techChain: readonly FlowNode[] = [
  {
    id: 'network',
    label: 'Network',
    role: 'Connectivité et infrastructure réseau sécurisée : la fondation sur laquelle tout repose.',
    icon: 'network',
    technologies: ['Cisco', 'Aruba', 'Fortinet', 'WAN/LAN', 'Linux'],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    role: 'Hébergement, DNS, SSL/TLS, stockage objet et déploiement des applications et des données.',
    icon: 'cloud',
    technologies: ['AWS', 'Cloudflare', 'Cloudflare R2', 'Render', 'Neon', 'VPS', 'Docker'],
  },
  {
    id: 'ingestion',
    label: 'Data Ingestion',
    role: 'Collecte des données depuis des sources et des APIs, en continu ou par lots.',
    icon: 'download',
    technologies: ['Apache NiFi', 'Apache Kafka', 'APIs'],
  },
  {
    id: 'etl',
    label: 'ETL / ELT',
    role: 'Nettoyage, transformation et chargement des données vers les couches de stockage.',
    icon: 'workflow',
    technologies: ['Python', 'Pandas', 'SQL', 'Apache NiFi'],
  },
  {
    id: 'bigdata',
    label: 'Big Data',
    role: 'Traitement distribué, batch et streaming, indexation et recherche à grande échelle.',
    icon: 'layers',
    technologies: ['Apache Spark', 'Apache Kafka', 'Elasticsearch', 'OpenSearch'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    role: 'Exploration, analyse géospatiale et tableaux de bord pour rendre la donnée lisible.',
    icon: 'chart',
    technologies: ['PostgreSQL', 'PostGIS', 'Kibana', 'Grafana', 'Plotly'],
  },
  {
    id: 'ai',
    label: 'AI',
    role: 'Machine Learning, LLM, RAG et agents pour prédire, classer et assister.',
    icon: 'brain',
    technologies: ['Scikit-learn', 'OpenAI', 'RAG'],
  },
  {
    id: 'security',
    label: 'Security',
    role: 'Détection, investigation et réponse : sécuriser chaque couche de la chaîne.',
    icon: 'shield',
    technologies: ['Wazuh', 'TheHive', 'ELK', 'OpenSearch'],
  },
  {
    id: 'decision',
    label: 'Decision',
    role: 'Transformer l’information en aide à la décision : systèmes et tableaux de bord orientés action.',
    icon: 'target',
    technologies: [],
  },
]

/** Cloud & Deployment : de l'utilisateur aux données. */
export const cloudFlow: readonly FlowRow[] = [
  {
    id: 'edge',
    nodes: [
      {
        id: 'cloudflare',
        label: 'Cloudflare',
        role: 'Point d’entrée : DNS, CDN et certificats SSL/TLS.',
        icon: 'globe',
        technologies: ['DNS', 'CDN', 'SSL/TLS'],
      },
    ],
  },
  {
    id: 'frontend',
    nodes: [
      {
        id: 'frontend',
        label: 'Frontend',
        role: 'Interface web servie via le CDN.',
        icon: 'code',
        technologies: ['React', 'TypeScript'],
      },
    ],
  },
  {
    id: 'hosting',
    nodes: [
      {
        id: 'render',
        label: 'Render',
        role: 'Plateforme managée pour déployer des services.',
        icon: 'cloud',
        technologies: ['Render'],
      },
      {
        id: 'vps',
        label: 'VPS',
        role: 'Serveur Linux administré : Docker, reverse proxy, SSL.',
        icon: 'server',
        technologies: ['Linux', 'Docker', 'Reverse proxy'],
      },
      {
        id: 'aws',
        label: 'AWS',
        role: 'Services d’infrastructure Cloud.',
        icon: 'boxes',
        technologies: ['AWS'],
      },
    ],
  },
  {
    id: 'api',
    nodes: [
      {
        id: 'api',
        label: 'API',
        role: 'Backend conteneurisé exposant les services applicatifs.',
        icon: 'workflow',
        technologies: ['FastAPI', 'Docker'],
      },
    ],
  },
  {
    id: 'storage',
    nodes: [
      {
        id: 'neon',
        label: 'Neon PostgreSQL',
        role: 'Base de données relationnelle managée.',
        icon: 'database',
        technologies: ['PostgreSQL', 'Neon'],
      },
      {
        id: 'r2',
        label: 'Cloudflare R2',
        role: 'Stockage objet pour les fichiers et médias.',
        icon: 'boxes',
        technologies: ['Object storage', 'Cloudflare R2'],
      },
    ],
  },
]

/** Sources → NiFi → Kafka → Spark → Storage → Analytics → AI. */
export const pipelineFlow: readonly FlowNode[] = [
  {
    id: 'sources',
    label: 'Sources',
    role: 'Bases de données, APIs, fichiers et journaux : l’origine des données.',
    icon: 'database',
    technologies: [],
  },
  {
    id: 'nifi',
    label: 'Apache NiFi',
    role: 'Ingestion, routage et transformation des flux (ETL / ELT).',
    icon: 'download',
    technologies: ['ETL', 'ELT', 'Ingestion'],
  },
  {
    id: 'kafka',
    label: 'Apache Kafka',
    role: 'Transport des événements en continu : le socle du streaming.',
    icon: 'activity',
    technologies: ['Streaming', 'Événements'],
  },
  {
    id: 'spark',
    label: 'Apache Spark',
    role: 'Traitement distribué des données, en batch comme en streaming.',
    icon: 'layers',
    technologies: ['Batch', 'Streaming', 'Distribué'],
  },
  {
    id: 'storage',
    label: 'Storage',
    role: 'Stockage relationnel, graphe, recherche et data lake.',
    icon: 'server',
    technologies: ['PostgreSQL', 'Neo4j', 'Elasticsearch', 'OpenSearch'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    role: 'Exploration et visualisation des données transformées.',
    icon: 'chart',
    technologies: ['Kibana', 'Grafana'],
  },
  {
    id: 'ai',
    label: 'AI',
    role: 'Modèles prédictifs, LLM et RAG alimentés par des données fiables.',
    icon: 'brain',
    technologies: ['Scikit-learn', 'RAG'],
  },
]

export const pipelineConcepts: ReadonlyArray<{ label: string; description: string }> = [
  { label: 'ETL / ELT', description: 'Extraire, transformer, charger — ou charger d’abord, transformer ensuite.' },
  { label: 'Ingestion', description: 'Collecte planifiée ou continue depuis des sources multiples.' },
  { label: 'Traitement distribué', description: 'Calcul réparti sur plusieurs nœuds pour absorber les volumes.' },
  { label: 'Batch', description: 'Traitements par lots, planifiés et reproductibles.' },
  { label: 'Streaming', description: 'Traitement des événements au fil de l’eau.' },
  { label: 'Data pipelines', description: 'Enchaînements automatisés, surveillés et maintenables.' },
]

/** Applications → Logs → ELK/OpenSearch → Kibana/Grafana → Monitoring → Detection → Security Response. */
export const observabilityFlow: readonly FlowNode[] = [
  {
    id: 'applications',
    label: 'Applications',
    role: 'Applications, systèmes et équipements qui produisent des événements.',
    icon: 'code',
    technologies: [],
  },
  {
    id: 'logs',
    label: 'Logs',
    role: 'Collecte et centralisation des journaux et des métriques.',
    icon: 'file',
    technologies: [],
  },
  {
    id: 'elk',
    label: 'ELK / OpenSearch',
    role: 'Indexation et recherche rapide dans de gros volumes de logs.',
    icon: 'search',
    technologies: ['Elasticsearch', 'OpenSearch', 'ELK'],
  },
  {
    id: 'dashboards',
    label: 'Kibana / Grafana',
    role: 'Visualisation, tableaux de bord et exploration.',
    icon: 'chart',
    technologies: ['Kibana', 'Grafana'],
  },
  {
    id: 'monitoring',
    label: 'Monitoring',
    role: 'Surveillance continue, seuils et alertes.',
    icon: 'activity',
    technologies: ['Grafana'],
  },
  {
    id: 'detection',
    label: 'Detection',
    role: 'Détection d’événements de sécurité et corrélation.',
    icon: 'radar',
    technologies: ['Wazuh'],
  },
  {
    id: 'response',
    label: 'Security Response',
    role: 'Qualification, investigation et traitement des incidents.',
    icon: 'siren',
    technologies: ['TheHive'],
  },
]

export const securityTools: ReadonlyArray<{ name: string; role: string }> = [
  { name: 'Wazuh', role: 'Supervision de sécurité et détection d’événements.' },
  { name: 'TheHive', role: 'Gestion et traitement des incidents de sécurité.' },
  { name: 'Elasticsearch · OpenSearch', role: 'Indexation et recherche dans les journaux.' },
  { name: 'Kibana · Grafana', role: 'Visualisation, tableaux de bord et alerting.' },
]
