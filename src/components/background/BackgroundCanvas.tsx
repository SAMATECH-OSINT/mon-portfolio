import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { usePointerParallax } from '@/hooks/usePointerParallax'
import { moodFor } from './moods'
import { NetworkField } from './networkField'

interface BackgroundCanvasProps {
  activeSection: string
}

/** Au-delà de ce temps moyen par image (ms), la densité est réduite. */
const SLOW_FRAME_MS = 22
const SAMPLE_FRAMES = 90
const MAX_DEGRADATIONS = 3

/**
 * Background global fixe. Décoratif : ne capte aucun événement et n'est pas exposé
 * aux technologies d'assistance.
 */
export default function BackgroundCanvas({ activeSection }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fieldRef = useRef<NetworkField | null>(null)
  const sectionRef = useRef(activeSection)
  const reduceMotion = useReducedMotion() ?? false
  const pointer = usePointerParallax(!reduceMotion)

  useEffect(() => {
    sectionRef.current = activeSection
    fieldRef.current?.setMood(moodFor(activeSection))
  }, [activeSection])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const field = new NetworkField(ctx, !reduceMotion)
    fieldRef.current = field
    field.setMood(moodFor(sectionRef.current))

    let dprCap = 1.5
    let width = 0
    let height = 0

    const fit = (force: boolean) => {
      const w = window.innerWidth
      const h = window.innerHeight
      // La barre d'adresse mobile fait varier la hauteur : on ignore les petites variations.
      if (!force && w === width && Math.abs(h - height) < 160) return
      width = w
      height = h
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      field.resize(w, h, dpr)
      if (reduceMotion) field.render()
    }
    const onResize = () => fit(false)

    fit(true)
    window.addEventListener('resize', onResize)

    // Reduced motion : une seule image statique, aucune boucle, aucune interaction.
    if (reduceMotion) {
      return () => {
        window.removeEventListener('resize', onResize)
        fieldRef.current = null
      }
    }

    const onScroll = () => field.setScroll(window.scrollY)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    let raf = 0
    let last = 0
    let sampled = 0
    let sampleTime = 0
    let degradations = 0

    const tick = (now: number) => {
      const dt = last === 0 ? 16 : Math.min(now - last, 64)
      last = now

      field.setPointer(pointer.current.x, pointer.current.y)
      field.update(dt / 1000)
      field.render()

      sampled++
      sampleTime += dt
      if (sampled === SAMPLE_FRAMES) {
        if (sampleTime / sampled > SLOW_FRAME_MS && degradations < MAX_DEGRADATIONS) {
          degradations++
          dprCap = 1
          field.reduceDensity()
          fit(true)
        }
        sampled = 0
        sampleTime = 0
      }
      raf = requestAnimationFrame(tick)
    }

    const start = () => {
      if (raf !== 0) return
      last = 0
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    document.addEventListener('visibilitychange', onVisibility)
    start()

    return () => {
      stop()
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      fieldRef.current = null
    }
  }, [reduceMotion, pointer])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-0 size-full" />
}
