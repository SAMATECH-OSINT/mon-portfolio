import { useEffect, useState } from 'react'

/**
 * Devient vrai une fois le navigateur au repos après le premier rendu.
 * Sert à différer les éléments décoratifs pour ne pas concurrencer le contenu.
 */
export function useIdleReady(timeout = 900): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setReady(true), { timeout })
      return () => window.cancelIdleCallback(id)
    }
    const id = window.setTimeout(() => setReady(true), 250)
    return () => window.clearTimeout(id)
  }, [timeout])

  return ready
}
