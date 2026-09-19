import { TODO } from './types'
import type { IconKey, Maybe } from './types'

export interface Social {
  id: 'linkedin' | 'github' | 'email'
  label: string
  icon: IconKey
  /** URL ou `mailto:`. Tant que la valeur est `TODO`, aucun lien n'est rendu. */
  href: Maybe<string>
}

export const socials: readonly Social[] = [
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', href: TODO },
  { id: 'github', label: 'GitHub', icon: 'github', href: TODO },
  { id: 'email', label: 'Email', icon: 'mail', href: TODO },
]
