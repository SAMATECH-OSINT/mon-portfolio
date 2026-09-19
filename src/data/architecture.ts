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
  /** Nature de la brique (ex. « Hébergement », « Plateforme managée ») : évite de mettre tous les acteurs au même niveau. */
  tag?: string
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
    role: 'Connectivité et infrastructure réseau sécurisée : la fondation sur laquelle tout repose.',
    icon: 'network',
    technologies: ['Cisco', 'Aruba', 'Fortinet', 'WAN/LAN', 'Linux'],
  },
  {
    id: 'cloud',
    label: 'Cloud',
    role: 'Hébergement, conteneurisation, déploiement, DNS, SSL/TLS et stockage objet des applications et des données.',
    icon: 'cloud',
    technologies: ['AWS', 'Cloudflare', 'Cloudflare R2', 'Render', 'Neon', 'Hostinger', 'VPS', 'Docker', 'Dokploy'],
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
    role: 'Traitement distribué, batch et streaming, stockage NoSQL, indexation et recherche à grande échelle.',
    icon: 'layers',
    technologies: ['Apache Spark', 'Apache Kafka', 'Elasticsearch', 'OpenSearch', 'MongoDB'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    role: 'Exploration, analyse géospatiale et tableaux de bord pour rendre la donnée lisible.',
    icon: 'chart',
    technologies: ['PostgreSQL', 'PostGIS', 'Neo4j', 'Kibana', 'Grafana', 'Plotly'],
  },
  {
    id: 'ai',
    label: 'AI',
    role: 'Machine Learning, NLP / LLM, RAG et agents pour prédire, classer, interroger et assister.',
    icon: 'brain',
    technologies: ['Scikit-learn', 'XGBoost', 'OpenAI', 'RAG'],
  },
  {
    id: 'security',
    label: 'Security',
    role: 'Détection, investigation et réponse : sécuriser chaque couche de la chaîne.',
    icon: 'shield',
    technologies: ['Wazuh', 'TheHive', 'ELK', 'OpenSearch'],
  },
  {
    id: 'decision',
    label: 'Decision',
    role: 'Transformer l’information en aide à la décision : systèmes et tableaux de bord orientés action.',
    icon: 'target',
    technologies: [],
  },
]

/**
 * Cloud & Deployment : topologie de référence, de l'utilisateur aux données.
 * Représentation générale : chaque projet n'utilise qu'une partie de ces briques.
 */
export const cloudFlow: readonly FlowRow[] = [
  {
    id: 'edge',
    nodes: [
      {
        id: 'cloudflare',
        label: 'Cloudflare',
        role: 'Point d’entrée : DNS, CDN et certificats SSL/TLS.',
        icon: 'globe',
        technologies: ['DNS', 'CDN', 'SSL/TLS'],
      },
    ],
  },
  {
    id: 'hosting',
    nodes: [
      {
        id: 'hostinger',
        label: 'Hostinger / VPS',
        tag: 'Hébergement',
        role: 'Solution d’hébergement et d’infrastructure utilisée pour le déploiement : serveur Linux administré, reverse proxy, SSL.',
        icon: 'server',
        technologies: ['Hostinger', 'VPS', 'Linux', 'Reverse proxy'],
      },
      {
        id: 'render',
        label: 'Render',
        tag: 'Plateforme managée',
        role: 'Déploiement de services sur une plateforme managée.',
        icon: 'cloud',
        technologies: ['Render'],
      },
      {
        id: 'aws',
        label: 'AWS',
        tag: 'Cloud provider',
        role: 'Services d’infrastructure Cloud.',
        icon: 'boxes',
        technologies: ['AWS'],
      },
    ],
  },
  {
    id: 'containers',
    nodes: [
      {
        id: 'docker',
        label: 'Docker',
        tag: 'Conteneurisation',
        role: 'Applications et services packagés en conteneurs, reproductibles d’un environnement à l’autre.',
        icon: 'boxes',
        technologies: ['Docker'],
      },
    ],
  },
  {
    id: 'deployment',
    nodes: [
      {
        id: 'dokploy',
        label: 'Dokploy',
        tag: 'Déploiement',
        role: 'Déploiement et gestion des applications conteneurisées sur le serveur.',
        icon: 'workflow',
        technologies: ['Dokploy', 'Docker'],
      },
    ],
  },
  {
    id: 'services',
    nodes: [
      {
        id: 'apps',
        label: 'Applications / APIs',
        role: 'Frontends web et APIs exposant les services applicatifs.',
        icon: 'code',
        technologies: ['React', 'FastAPI', 'Django'],
      },
    ],
  },
  {
    id: 'data',
    nodes: [
      {
        id: 'neon',
        label: 'PostgreSQL / Neon',
        tag: 'Relationnel',
        role: 'Base de données relationnelle, auto-hébergée ou managée avec Neon.',
        icon: 'database',
        technologies: ['PostgreSQL', 'Neon'],
      },
      {
        id: 'mongodb',
        label: 'MongoDB',
        tag: 'NoSQL · document',
        role: 'Base de données NoSQL orientée documents.',
        icon: 'database',
        technologies: ['MongoDB'],
      },
      {
        id: 'r2',
        label: 'Cloudflare R2',
        tag: 'Stockage objet',
        role: 'Stockage objet pour les fichiers et médias.',
        icon: 'boxes',
        technologies: ['Object storage', 'Cloudflare R2'],
      },
    ],
  },
]

/** Chaîne de livraison : Infrastructure → Conteneurisation → Déploiement → Services → Données → Sécurité → Observabilité. */
export const deliveryChain: readonly FlowNode[] = [
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    role: 'Serveurs Linux et hébergement : la base sur laquelle tournent les services.',
    icon: 'server',
    technologies: ['Hostinger', 'VPS', 'Linux'],
  },
  {
    id: 'containerization',
    label: 'Conteneurisation',
    role: 'Applications et services packagés en conteneurs pour des déploiements reproductibles.',
    icon: 'boxes',
    technologies: ['Docker'],
  },
  {
    id: 'deployment',
    label: 'Déploiement',
    role: 'Mise en production et gestion des conteneurs : de Docker à l’application en ligne.',
    icon: 'workflow',
    technologies: ['Dokploy', 'Docker', 'CI/CD'],
  },
  {
    id: 'services',
    label: 'Services',
    role: 'Applications et APIs exposées aux utilisateurs.',
    icon: 'code',
    technologies: ['FastAPI', 'Django', 'React'],
  },
  {
    id: 'data',
    label: 'Données',
    role: 'Bases relationnelles, documentaires et graphe, stockage objet.',
    icon: 'database',
    technologies: ['PostgreSQL', 'Neon', 'MongoDB', 'Neo4j', 'Cloudflare R2'],
  },
  {
    id: 'security',
    label: 'Sécurité',
    role: 'Chiffrement, reverse proxy, détection et réponse : sécuriser chaque couche.',
    icon: 'shield',
    technologies: ['SSL/TLS', 'Reverse proxy', 'Wazuh', 'TheHive'],
  },
  {
    id: 'observability',
    label: 'Observabilité',
    role: 'Logs, métriques et tableaux de bord pour superviser les systèmes en production.',
    icon: 'activity',
    technologies: ['ELK', 'OpenSearch', 'Kibana', 'Grafana'],
  },
]

/** Sources → NiFi → Kafka → Spark → Storage → Analytics → AI. */
export const pipelineFlow: readonly FlowNode[] = [
  {
    id: 'sources',
    label: 'Sources',
    role: 'Bases de données, APIs, fichiers et journaux : l’origine des données.',
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
    role: 'Transport des événements en continu : le socle du streaming.',
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
    role: 'Stockage relationnel, document (NoSQL), graphe, recherche et data lake.',
    icon: 'server',
    technologies: ['PostgreSQL', 'MongoDB', 'Neo4j', 'Elasticsearch', 'OpenSearch'],
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
    technologies: ['Scikit-learn', 'XGBoost', 'RAG'],
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
