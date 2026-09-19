/**
 * Marqueur de donnée manquante.
 * Règle du projet : aucune information n'est inventée. Toute valeur non
 * validée par Mamadou Sarr vaut `TODO` et s'affiche « À compléter » (ou est
 * masquée) côté interface.
 */
export const TODO = 'TODO' as const
export type Todo = typeof TODO

/** Valeur renseignée ou marqueur `TODO`. */
export type Maybe<T> = T | Todo

export function isTodo(value: unknown): value is Todo {
  return value === TODO
}

/** Clés d'icônes, résolues vers Lucide dans `lib/icons.ts`. */
export type IconKey =
  | 'network'
  | 'shield'
  | 'cloud'
  | 'database'
  | 'layers'
  | 'brain'
  | 'code'
  | 'workflow'
  | 'target'
  | 'linkedin'
  | 'github'
  | 'mail'
  | 'graduation'
  | 'book'
  | 'award'
  | 'landmark'
  | 'scale'
  | 'globe'
  | 'users'

export interface Period {
  /** Année de début. */
  start: Maybe<number>
  /** Année de fin, `null` pour « aujourd'hui ». */
  end: Maybe<number> | null
}
