import { isTodo } from '@/data/types'
import type { Maybe } from '@/data/types'

/**
 * Libellé de période. Une année inconnue est omise : l'interface n'affiche jamais
 * de texte d'attente (« À compléter », « TODO »…).
 */
export function formatPeriod(start: Maybe<number>, end: Maybe<number> | null): string {
  if (isTodo(start)) {
    if (end === null) return 'Poste actuel'
    return isTodo(end) ? '' : `Jusqu’en ${end}`
  }
  if (end === null) return `${start} — Aujourd’hui`
  return isTodo(end) || end === start ? String(start) : `${start} — ${end}`
}
