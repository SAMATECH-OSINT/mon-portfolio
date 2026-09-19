import { TODO } from './types'
import type { Maybe, Period } from './types'

export interface Experience {
  id: string
  organization: string
  /** Structure de rattachement, affichée après un tiret (ex. « — Police Nationale du Sénégal »). */
  affiliation?: string
  role: Maybe<string>
  period: Period
  summary: string
  /** Responsabilités (source : CV), volontairement génériques. */
  responsibilities: readonly string[]
  /** Axes de responsabilité en un coup d'œil. */
  focus: readonly string[]
}

/**
 * Contenu volontairement générique : aucun détail opérationnel ni nom de système interne.
 */
export const experiences: readonly Experience[] = [
  {
    id: 'dgmi',
    organization: 'Direction du Groupement Mobile d’Intervention (DGMI)',
    affiliation: 'Police Nationale du Sénégal',
    role: 'Responsable du Bureau Informatique et de la Transition Numérique',
    // TODO(à trancher) : année de début. CV « Depuis 2022 » ; premier cahier des charges « 2020 ».
    // Tant que non validée, l'interface affiche « Poste actuel » sans année.
    period: { start: TODO, end: null },
    summary: 'Pilotage du bureau informatique et de la transition numérique de la direction.',
    responsibilities: [
      'Administration et sécurisation des systèmes d’information institutionnels',
      'Conception, gestion et optimisation de bases de données opérationnelles',
      'Analyse de données pour l’aide à la décision stratégique et opérationnelle',
      'Participation active aux projets de modernisation et de transition numérique',
      'Contribution à la gouvernance et à la protection des données sensibles',
      'Supervision des infrastructures informatiques et réseaux du service',
    ],
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
    organization: 'Gendarmerie Nationale du Sénégal',
    affiliation: 'Service du Renseignement Criminel',
    role: 'Analyste en Données',
    period: { start: 2017, end: 2019 },
    summary: 'Analyse et gestion de données dans le domaine du renseignement criminel.',
    responsibilities: [
      'Gestion et exploitation de bases de données',
      'Développement d’outils internes d’analyse, de recherche et de veille',
      'Appui technique aux enquêtes numériques et à la veille stratégique',
      'Traitement, analyse et sécurisation de données à caractère sensible',
    ],
    focus: ['Analyse de données', 'Gestion de données', 'Renseignement criminel'],
  },
]
