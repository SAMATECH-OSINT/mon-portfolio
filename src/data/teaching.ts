export interface TeachingPost {
  id: string
  institution: string
  role: string
  status: string
  topics: readonly string[]
}

/** Enseignements en cours (source : CV). */
export const teachingPosts: readonly TeachingPost[] = [
  {
    id: 'ism',
    institution: 'Institut Supérieur de Management (ISM) — Thiès',
    role: 'Enseignant vacataire',
    status: 'En cours',
    topics: ['Bases de données relationnelles', 'Technologies Web'],
  },
  {
    id: 'enp',
    institution: 'École Nationale de Police',
    role: 'Enseignant / Formateur',
    status: 'En cours',
    topics: ['Introduction à la cybercriminalité'],
  },
]

export interface TeachingGroup {
  id: string
  label: string
  items: readonly string[]
}

/** Domaines d'intervention pédagogique (source : CV, en trois niveaux). */
export const teachingGroups: readonly TeachingGroup[] = [
  {
    id: 'core',
    label: 'Domaines de maîtrise',
    items: [
      'Bases de données relationnelles',
      'SQL',
      'PostgreSQL',
      'MySQL',
      'Modélisation des bases de données',
      'Python',
      'Python pour la Data',
      'Data Analysis',
      'Data Engineering',
      'Machine Learning',
      'Intelligence artificielle',
      'Introduction à la cybersécurité',
      'Introduction à la cybercriminalité',
      'Sécurité des systèmes d’information',
      'Réseaux informatiques',
      'Télécommunications',
    ],
  },
  {
    id: 'complementary',
    label: 'Domaines complémentaires',
    items: [
      'NoSQL',
      'Bases de données graphes (Neo4j)',
      'Data Visualization',
      'Gouvernance des données',
      'Systèmes d’information',
      'Sécurité des bases de données',
      'Administration réseaux',
      'Transmission de données',
      'Renseignement numérique',
      'Audit de sécurité',
      'Introduction à l’investigation numérique / forensic',
      'Accompagnement de projets étudiants',
    ],
  },
  {
    id: 'additional',
    label: 'Compétences complémentaires',
    items: ['Technologies Web', 'PHP / MySQL', 'API', 'Développement d’applications simples'],
  },
]
