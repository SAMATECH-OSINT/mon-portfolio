import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

/** Indique si l'élément est visible dans le viewport (pour suspendre les rendus hors écran). */
export function useInView<T extends Element>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? true), {
      rootMargin: '80px',
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return [ref, visible]
}
