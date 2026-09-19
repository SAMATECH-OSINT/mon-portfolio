import { TODO } from './types'
import type { Maybe } from './types'

export interface Certification {
  id: string
  /** Domaine de la formation. */
  domain: string
  title: string
  issuer: Maybe<string>
  year: Maybe<number>
  description?: string
  credentialUrl: Maybe<string>
}

/** Formations et certifications professionnelles spécialisées (source : CV). */
export const certifications: readonly Certification[] = [
  {
    id: 'data-analysis',
    domain: 'Data Analysis',
    title: 'Certification en Analyse de Données',
    issuer: 'Université Cheikh Hamidou Kane',
    year: 2024,
    credentialUrl: TODO,
  },
  {
    id: 'osint-audit',
    domain: 'Renseignement numérique et audit',
    title: 'Formation spécialisée en renseignement numérique, audit et méthodes OSINT',
    issuer: TODO,
    year: 2019,
    description: 'Formation dispensée avec le Federal Bureau of Investigation (FBI).',
    credentialUrl: TODO,
  },
  {
    id: 'cybersecurity',
    domain: 'Cybersécurité',
    title: 'Spécialisation en cybersécurité',
    issuer: 'Éléments Français au Sénégal (EFS)',
    year: 2018,
    credentialUrl: TODO,
  },
  {
    id: 'forensic',
    domain: 'Investigation numérique / Forensic',
    title: 'Formation spécialisée en analyse forensic numérique',
    issuer: TODO,
    year: TODO,
    description: 'Technologies Cellebrite UFED — Dakar.',
    credentialUrl: TODO,
  },
  {
    id: 'telecom-p25',
    domain: 'Réseaux et télécommunications professionnelles',
    title: 'Formations techniques Motorola — radiocommunication professionnelle P25',
    issuer: 'Motorola',
    year: TODO,
    description:
      'Déploiement de sites : configuration des équipements, liaisons en faisceaux hertziens (FH), intégration, interconnexion, tests, validation et mise en service de bout en bout.',
    credentialUrl: TODO,
  },
]
