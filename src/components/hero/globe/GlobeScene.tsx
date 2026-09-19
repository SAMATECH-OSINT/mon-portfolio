import { useEffect, useRef } from 'react'
import type { MutableRefObject } from 'react'
import type { PointerState } from '@/hooks/usePointerParallax'
import { createGlobe } from './createGlobe'
import type { GlobeHandle } from './createGlobe'

interface GlobeSceneProps {
  /** `false` : rendu suspendu (hors écran). */
  active: boolean
  lowPower: boolean
  pointer: MutableRefObject<PointerState>
  onReady: () => void
  onContextLost: () => void
}

/** Globe numérique WebGL. Chargé en différé, jamais requis pour lire le contenu. */
export default function GlobeScene({ active, lowPower, pointer, onReady, onContextLost }: GlobeSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const handleRef = useRef<GlobeHandle | null>(null)
  const activeRef = useRef(active)
  const callbacks = useRef({ onReady, onContextLost })

  useEffect(() => {
    activeRef.current = active
    callbacks.current = { onReady, onContextLost }
    handleRef.current?.setActive(active)
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let handle: GlobeHandle
    try {
      handle = createGlobe(canvas, { lowPower, pointer, onContextLost: () => callbacks.current.onContextLost() })
    } catch {
      // WebGL refusé malgré la détection : on bascule sur le rendu 2D.
      callbacks.current.onContextLost()
      return
    }
    handleRef.current = handle
    handle.setActive(activeRef.current)

    let announced = false
    const observer = new ResizeObserver(([entry]) => {
      if (!entry) return
      handle.resize(entry.contentRect.width, entry.contentRect.height)
      if (!announced) {
        announced = true
        callbacks.current.onReady()
      }
    })
    observer.observe(canvas)

    return () => {
      observer.disconnect()
      handle.dispose()
      handleRef.current = null
    }
  }, [lowPower, pointer])

  return <canvas ref={canvasRef} aria-hidden className="block size-full" />
}
