import { TODO } from './types'
import type { Maybe, Period } from './types'

export interface Experience {
  id: string
  organization: string
  role: Maybe<string>
  period: Period
  summary: string
  /** Axes de responsabilité confirmés. */
  focus: readonly string[]
}

/**
 * Contenu volontairement générique : aucun détail opérationnel ni nom de
 * système interne sans validation de Mamadou Sarr.
 */
export const experiences: readonly Experience[] = [
  {
    id: 'gmi',
    organization: 'Direction du Groupement Mobile d’Intervention',
    role: 'Responsable du Bureau Informatique et Transition Numérique',
    period: { start: 2020, end: null },
    summary: 'Pilotage du bureau informatique et de la transition numérique.',
    focus: [
      'Systèmes d’information',
      'Sécurité',
      'Transformation numérique',
      'Infrastructure',
      'Projets numériques',
      'Données',
    ],
  },
  {
    id: 'gendarmerie-nationale',
    organization: 'Gendarmerie Nationale',
    role: TODO,
    period: { start: 2017, end: 2019 },
    summary: 'Analyse et gestion de données dans le domaine du renseignement criminel.',
    focus: ['Analyse de données', 'Gestion de données', 'Renseignement criminel'],
  },
]
