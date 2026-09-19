export interface NavItem {
  label: string
  /** Section de destination du lien. */
  target: string
  /** Sections rattachées : le lien reste actif lorsqu'elles sont visibles. */
  sections: readonly string[]
}

/** Ordre des sections sur la page. */
export const sectionOrder = [
  'home',
  'about',
  'expertise',
  'architecture',
  'cloud',
  'pipelines',
  'observability',
  'projects',
  'experience',
  'education',
  'skills',
  'research',
  'teaching',
  'impact',
  'contact',
] as const

export type SectionId = (typeof sectionOrder)[number]

/** Navigation compacte (9 entrées) ; les blocs Cloud, Observability, etc. restent distincts dans la page. */
export const navItems: readonly NavItem[] = [
  { label: 'Accueil', target: 'home', sections: ['home'] },
  { label: 'À propos', target: 'about', sections: ['about'] },
  { label: 'Expertise', target: 'expertise', sections: ['expertise'] },
  { label: 'Architecture', target: 'architecture', sections: ['architecture', 'cloud', 'pipelines', 'observability'] },
  { label: 'Projets', target: 'projects', sections: ['projects'] },
  { label: 'Expérience', target: 'experience', sections: ['experience', 'education'] },
  { label: 'Compétences', target: 'skills', sections: ['skills'] },
  { label: 'Recherche', target: 'research', sections: ['research', 'teaching'] },
  { label: 'Contact', target: 'contact', sections: ['impact', 'contact'] },
]

export const navCta = { label: 'Me contacter', target: 'contact' } as const
