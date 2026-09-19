import { TODO } from './types'
import type { Maybe } from './types'

export interface Certification {
  id: string
  title: string
  issuer: Maybe<string>
  year: Maybe<number>
  credentialUrl: Maybe<string>
}

export const certifications: readonly Certification[] = [
  {
    id: 'data-analysis',
    title: 'Certification Data Analysis',
    issuer: TODO,
    year: 2024,
    credentialUrl: TODO,
  },
]
