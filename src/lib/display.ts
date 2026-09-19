import { isTodo } from '@/data/types'
import type { Maybe } from '@/data/types'

export const PENDING_LABEL = 'À compléter'

/** Texte affichable pour une donnée éventuellement manquante. */
export function displayValue<T extends string | number>(value: Maybe<T>): string {
  return isTodo(value) ? PENDING_LABEL : String(value)
}

/** Libellé de période : « 2020 — Aujourd'hui ». */
export function formatPeriod(start: Maybe<number>, end: Maybe<number> | null): string {
  const from = displayValue(start)
  const to = end === null ? 'Aujourd’hui' : displayValue(end)
  return `${from} — ${to}`
}
