import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'

export interface PointerState {
  /** Position normalisée dans la fenêtre, de -1 à 1. */
  x: number
  y: number
}

/**
 * Position de la souris normalisée, sans re-render.
 * Ignore le tactile (aucune parallaxe au doigt) et se désactive si `enabled` est faux.
 */
export function usePointerParallax(enabled: boolean): MutableRefObject<PointerState> {
  const pointer = useRef<PointerState>({ x: 0, y: 0 })

  useEffect(() => {
    if (!enabled) {
      pointer.current.x = 0
      pointer.current.y = 0
      return
    }
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [enabled])

  return pointer
}
