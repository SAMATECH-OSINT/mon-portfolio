import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

const SCROLLED_THRESHOLD = 12

/**
 * Suit le défilement de la page sans re-rendre à chaque pixel :
 * - la progression de lecture (0 → 1) est écrite directement sur `barRef` (`transform: scaleX`) ;
 * - `scrolled` ne change d'état qu'au franchissement du seuil.
 */
export function useScrollProgress(): { barRef: RefObject<HTMLDivElement | null>; scrolled: boolean } {
  const barRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
      setScrolled(window.scrollY > SCROLLED_THRESHOLD)
    }
    const schedule = () => {
      if (frame === 0) frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  return { barRef, scrolled }
}
