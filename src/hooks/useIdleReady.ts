import { useEffect, useState } from 'react'

/**
 * Devient vrai une fois le navigateur au repos après le premier rendu, puis après
 * `extraDelay` ms. Sert à échelonner les éléments décoratifs pour ne jamais
 * concurrencer le contenu.
 */
export function useIdleReady(extraDelay = 0): boolean {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let timer = 0
    const arm = () => {
      timer = window.setTimeout(() => setReady(true), extraDelay)
    }
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(arm, { timeout: 900 })
      return () => {
        window.cancelIdleCallback(id)
        window.clearTimeout(timer)
      }
    }
    timer = window.setTimeout(arm, 250)
    return () => window.clearTimeout(timer)
  }, [extraDelay])

  return ready
}
