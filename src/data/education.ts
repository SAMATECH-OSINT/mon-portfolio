import { TODO } from './types'
import type { Maybe } from './types'

export interface Education {
  id: string
  title: string
  institution: Maybe<string>
  year: Maybe<number>
}

/** Ordre antéchronologique. */
export const education: readonly Education[] = [
  {
    id: 'm2-idia',
    title: 'Master 2 Ingénierie des Données et IA',
    institution: TODO,
    year: 2024,
  },
  {
    id: 'analyste-cyber',
    title: 'Analyste en Cybersécurité',
    institution: TODO,
    year: 2018,
  },
  {
    id: 'm2-rt',
    title: 'Master 2 Réseaux & Télécoms',
    institution: TODO,
    year: 2016,
  },
  {
    id: 'dut-ei',
    title: 'DUT Électronique & Informatique',
    institution: TODO,
    year: TODO,
  },
]
