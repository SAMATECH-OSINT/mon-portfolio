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
  /** Positionnement de la brique (ex. « Hosting / Infrastructure », « Cloud Provider ») ou phase (ex. « Detect ») : évite de mettre tous les acteurs au même niveau. */
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
    technologies: ['Cisco', 'Aruba', 'Fortinet', 'pfSense', 'WAN/LAN', 'Linux'],
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
    technologies: ['Scikit-learn', 'Random Forest', 'XGBoost', 'OpenAI', 'RAG'],
  },
  {
    id: 'security',
    label: 'Security',
    role: 'Détection, investigation et réponse : sécuriser chaque couche de la chaîne.',
    icon: 'shield',
    technologies: ['Suricata', 'OpenVPN', 'Wazuh', 'TheHive', 'ELK', 'OpenSearch'],
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
        tag: 'Edge / DNS / Security',
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
        tag: 'Hosting / Infrastructure',
        role: 'Solution d’hébergement et d’infrastructure utilisée pour le déploiement : serveur Linux administré, reverse proxy, SSL.',
        icon: 'server',
        technologies: ['Hostinger', 'VPS', 'Linux', 'Reverse proxy'],
      },
      {
        id: 'render',
        label: 'Render',
        tag: 'Cloud Application Deployment',
        role: 'Déploiement de services sur une plateforme managée.',
        icon: 'cloud',
        technologies: ['Render'],
      },
      {
        id: 'aws',
        label: 'AWS',
        tag: 'Cloud Provider',
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
        tag: 'Containerization',
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
        tag: 'Deployment / Application Management',
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
        tag: 'Relational · PostgreSQL Cloud',
        role: 'Base de données relationnelle, auto-hébergée ou managée avec Neon.',
        icon: 'database',
        technologies: ['PostgreSQL', 'Neon'],
      },
      {
        id: 'mongodb',
        label: 'MongoDB',
        tag: 'Document · NoSQL',
        role: 'Base de données NoSQL orientée documents.',
        icon: 'database',
        technologies: ['MongoDB'],
      },
      {
        id: 'r2',
        label: 'Cloudflare R2',
        tag: 'Object Storage',
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

/** Sources → Data Ingestion → ETL / ELT → Streaming → Storage → Distributed Processing → Analytics → AI. */
export const pipelineFlow: readonly FlowNode[] = [
  {
    id: 'sources',
    label: 'Sources',
    role: 'Bases de données, APIs, fichiers et journaux : l’origine des données.',
    icon: 'database',
    technologies: [],
  },
  {
    id: 'ingestion',
    label: 'Data Ingestion',
    role: 'Collecte et routage des données depuis des sources multiples, en continu ou par lots.',
    icon: 'download',
    technologies: ['Apache NiFi', 'APIs'],
  },
  {
    id: 'etl',
    label: 'ETL / ELT',
    role: 'Nettoyage, transformation et chargement des données vers les couches de stockage.',
    icon: 'workflow',
    technologies: ['Python', 'Pandas', 'Apache NiFi'],
  },
  {
    id: 'streaming',
    label: 'Streaming',
    role: 'Transport des événements en continu : le socle du temps réel.',
    icon: 'activity',
    technologies: ['Apache Kafka'],
  },
  {
    id: 'storage',
    label: 'Storage',
    role: 'Stockage relationnel, document (NoSQL), graphe, recherche et data lake.',
    icon: 'server',
    technologies: ['PostgreSQL', 'MongoDB', 'Neo4j', 'Elasticsearch', 'OpenSearch'],
  },
  {
    id: 'processing',
    label: 'Distributed Processing',
    role: 'Traitement distribué des données à grande échelle, en batch comme en streaming.',
    icon: 'layers',
    technologies: ['Apache Spark'],
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
    role: 'Modèles prédictifs, NLP / LLM et RAG alimentés par des données fiables.',
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

/** Collect → Detect → Correlate → Alert → Investigate → Respond → Monitor. */
export const socPhases: readonly string[] = ['Collect', 'Detect', 'Correlate', 'Alert', 'Investigate', 'Respond', 'Monitor']

/**
 * Architecture SOC : représentation conceptuelle et générique. Elle ne décrit aucune
 * infrastructure institutionnelle réelle (aucun hôte, adresse, règle ni réseau interne).
 */
export const socFlow: readonly FlowNode[] = [
  {
    id: 'endpoints',
    label: 'Endpoints / Network',
    tag: 'Sources',
    role: 'Postes, serveurs et équipements réseau : la source des événements de sécurité.',
    icon: 'network',
    technologies: [],
  },
  {
    id: 'events',
    label: 'Logs / Security Events / Suricata',
    tag: 'Collect',
    role: 'Journaux système et applicatifs, événements réseau et alertes IDS / IPS collectés en continu.',
    icon: 'file',
    technologies: ['Suricata'],
  },
  {
    id: 'siem',
    label: 'Wazuh — SIEM / XDR open source',
    tag: 'Detect',
    role: 'Plateforme de supervision de sécurité : collecte des événements, analyse et détection.',
    icon: 'radar',
    technologies: ['Wazuh'],
  },
  {
    id: 'correlation',
    label: 'Detection & Correlation',
    tag: 'Correlate',
    role: 'Règles et corrélation d’événements pour faire ressortir les comportements suspects.',
    icon: 'workflow',
    technologies: [],
  },
  {
    id: 'alerts',
    label: 'Security Alerts',
    tag: 'Alert',
    role: 'Alertes qualifiées et hiérarchisées, transmises pour traitement.',
    icon: 'siren',
    technologies: [],
  },
  {
    id: 'thehive',
    label: 'TheHive — Incident Response / Case Management',
    tag: 'Investigate',
    role: 'Ouverture et suivi des dossiers d’incident, collaboration entre analystes.',
    icon: 'briefcase',
    technologies: ['TheHive'],
  },
  {
    id: 'response',
    label: 'Investigation / Response',
    tag: 'Respond',
    role: 'Analyse de l’incident et actions de réponse.',
    icon: 'shield',
    technologies: [],
  },
  {
    id: 'reporting',
    label: 'Monitoring / Reporting',
    tag: 'Monitor',
    role: 'Suivi continu, tableaux de bord et rapports pour piloter la sécurité dans la durée.',
    icon: 'activity',
    technologies: ['Kibana', 'Grafana'],
  },
]

export interface ObservabilityFamily {
  id: string
  label: string
  icon: IconKey
  description: string
  /** Noms de technologies ; le positionnement de chacune vient de `technologyRoles` (data/skills.ts). */
  tools: readonly string[]
}

/** Observability : quatre familles distinctes, jamais présentées comme un produit unique. */
export const observabilityFamilies: readonly ObservabilityFamily[] = [
  {
    id: 'logs',
    label: 'Logs / Search',
    icon: 'search',
    description: 'Indexer et interroger de gros volumes de journaux.',
    tools: ['ELK', 'Elasticsearch', 'OpenSearch'],
  },
  {
    id: 'visualization',
    label: 'Visualization',
    icon: 'chart',
    description: 'Tableaux de bord et exploration visuelle des données.',
    tools: ['Kibana', 'Grafana'],
  },
  {
    id: 'security-monitoring',
    label: 'Security Monitoring',
    icon: 'radar',
    description: 'Détection des événements de sécurité, sur les hôtes comme sur le réseau.',
    tools: ['Wazuh', 'Suricata'],
  },
  {
    id: 'incident-response',
    label: 'Incident Response',
    icon: 'siren',
    description: 'Qualification, suivi et traitement des incidents de sécurité.',
    tools: ['TheHive'],
  },
]

/**
 * Accès distant sécurisé : schéma de principe uniquement. Aucune adresse, configuration,
 * clé, nom d'hôte ni règle de pare-feu n'est publié.
 */
export const vpnFlow: readonly FlowNode[] = [
  {
    id: 'remote-user',
    label: 'Remote User',
    role: 'Utilisateur autorisé, connecté depuis l’extérieur.',
    icon: 'users',
    technologies: [],
  },
  {
    id: 'openvpn',
    label: 'OpenVPN',
    tag: 'VPN / Secure Access',
    role: 'Tunnel chiffré et authentification de l’accès distant.',
    icon: 'shield',
    technologies: [],
  },
  {
    id: 'secure-network',
    label: 'Secure Network',
    role: 'Réseau protégé, atteint à travers le tunnel sécurisé.',
    icon: 'network',
    technologies: [],
  },
  {
    id: 'protected-services',
    label: 'Protected Services',
    role: 'Applications et ressources réservées aux utilisateurs autorisés.',
    icon: 'server',
    technologies: [],
  },
]

/**
 * Cybersécurité × Data × IA : Network → Security Events → SIEM → Data Collection →
 * Data Engineering → Analytics → AI → Decision Support. Approche d'ingénierie, pas un schéma d'infrastructure réelle.
 */
export const securityDataThread: readonly FlowNode[] = [
  {
    id: 'network',
    label: 'Network',
    role: 'Le trafic et les équipements réseau : la première source de signaux.',
    icon: 'network',
    technologies: ['pfSense', 'Fortinet', 'Cisco', 'Aruba'],
  },
  {
    id: 'events',
    label: 'Security Events',
    role: 'Suricata (IDS / IPS) transforme le trafic réseau en événements de sécurité exploitables.',
    icon: 'radar',
    technologies: ['Suricata'],
  },
  {
    id: 'siem',
    label: 'SIEM / XDR',
    role: 'Wazuh — SIEM / XDR open source — collecte, détecte et corrèle ; TheHive prend en charge la gestion des incidents.',
    icon: 'shield',
    technologies: ['Wazuh', 'TheHive'],
  },
  {
    id: 'collection',
    label: 'Data Collection',
    role: 'Recherche, analyse et visualisation des logs à grande échelle.',
    icon: 'search',
    technologies: ['ELK', 'OpenSearch'],
  },
  {
    id: 'engineering',
    label: 'Data Engineering',
    role: 'Traitement, transformation et préparation de la donnée.',
    icon: 'workflow',
    technologies: ['Python', 'Pandas', 'ETL', 'Apache Spark'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    role: 'Exploration et tableaux de bord pour rendre la donnée lisible.',
    icon: 'chart',
    technologies: ['Kibana', 'Grafana'],
  },
  {
    id: 'ai',
    label: 'AI',
    role: 'Machine Learning et NLP pour une analyse avancée des données.',
    icon: 'brain',
    technologies: ['Scikit-learn', 'NLP', 'LLM'],
  },
  {
    id: 'decision',
    label: 'Decision Support',
    role: 'Recommandations et aide à la décision.',
    icon: 'target',
    technologies: [],
  },
]
