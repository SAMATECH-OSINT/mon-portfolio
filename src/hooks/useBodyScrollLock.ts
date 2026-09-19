import { useEffect } from 'react'

/** Bloque le scroll de la page tant que `locked` est vrai (menu mobile ouvert). */
export function useBodyScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}
