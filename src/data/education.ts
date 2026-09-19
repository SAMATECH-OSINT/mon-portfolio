import { TODO } from './types'
import type { Maybe } from './types'

export interface Education {
  id: string
  title: string
  institution: Maybe<string>
  year: Maybe<number>
}

/** Ordre antéchronologique. Source : CV ; Master 2 Réseaux et Télécommunications = 2017 (validé). */
export const education: readonly Education[] = [
  {
    id: 'm2-idia',
    title: 'Master 2 — Ingénierie des Données et Intelligence Artificielle',
    institution: 'Université de Thiès',
    year: 2024,
  },
  {
    id: 'm2-rt',
    title: 'Master 2 — Réseaux et Télécommunications',
    institution: 'Université de Thiès',
    year: 2017,
  },
  {
    id: 'licence-gi',
    title: 'Licence — Génie Informatique',
    institution: 'Université de Thiès',
    year: 2015,
  },
  {
    // TODO : établissement et année absents du CV.
    id: 'dut-gei',
    title: 'DUT — Génie Électrique et Informatique',
    institution: TODO,
    year: TODO,
  },
]
