import { useScroll, useSpring } from 'framer-motion'
import type { MotionValue } from 'framer-motion'

/** Progression de lecture de la page (0 → 1), lissée. */
export function useScrollProgress(): MotionValue<number> {
  const { scrollYProgress } = useScroll()
  return useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 })
}
