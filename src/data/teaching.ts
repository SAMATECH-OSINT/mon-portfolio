export interface TeachingDomain {
  id: string
  label: string
}

export const teachingDomains: readonly TeachingDomain[] = [
  { id: 'cybersecurity', label: 'Cybersécurité' },
  { id: 'dbms', label: 'SGBD' },
  { id: 'sql', label: 'SQL' },
  { id: 'nosql', label: 'NoSQL' },
  { id: 'neo4j', label: 'Neo4j' },
  { id: 'web', label: 'Technologies Web' },
  { id: 'cybercrime', label: 'Introduction à la cybercriminalité' },
  { id: 'student-projects', label: 'Accompagnement de projets étudiants' },
]
