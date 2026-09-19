import type { IconKey, Maybe } from './types'

export interface Social {
  id: 'linkedin' | 'github' | 'email'
  label: string
  icon: IconKey
  /** URL ou `mailto:`. Tant que la valeur est `TODO`, le bouton n'est pas affiché. */
  href: Maybe<string>
}

/**
 * Email : adresse professionnelle figurant sur le CV (à remplacer si vous préférez une autre adresse).
 * Téléphones et références du CV : volontairement non publiés.
 * LinkedIn et GitHub : URLs validées par Mamadou Sarr.
 */
export const socials: readonly Social[] = [
  { id: 'email', label: 'Email', icon: 'mail', href: 'mailto:mamadou.sarrgmi@interieur.gouv.sn' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/mamadou-sarr-4b2419114' },
  { id: 'github', label: 'GitHub', icon: 'github', href: 'https://github.com/SAMATECH-OSINT' },
]
