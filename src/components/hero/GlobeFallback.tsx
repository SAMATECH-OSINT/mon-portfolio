import { useEffect, useRef } from 'react'
import { DAKAR, GLOBE_NODES, VIEW_CENTER } from './globe/globeData'
import { decodeLand } from '@/lib/geo'
import type { LatLon } from '@/lib/geo'

const SIZE = 720
const DEG = Math.PI / 180

/** Projection orthographique centrée sur VIEW_CENTER ; `depth` > 0 = face visible. */
function project([lat, lon]: LatLon) {
  const [lat0, lon0] = VIEW_CENTER
  const phi = lat * DEG
  const phi0 = lat0 * DEG
  const dLon = (lon - lon0) * DEG
  return {
    x: Math.cos(phi) * Math.sin(dLon),
    y: Math.cos(phi0) * Math.sin(phi) - Math.sin(phi0) * Math.cos(phi) * Math.cos(dLon),
    depth: Math.sin(phi0) * Math.sin(phi) + Math.cos(phi0) * Math.cos(phi) * Math.cos(dLon),
  }
}

const COLORS = { 1: '22, 119, 255', 2: '0, 217, 255', 3: '191, 246, 255' } as const

function draw(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const c = SIZE / 2
  const radius = SIZE * 0.38
  ctx.clearRect(0, 0, SIZE, SIZE)

  const halo = ctx.createRadialGradient(c, c, radius * 0.9, c, c, radius * 1.3)
  halo.addColorStop(0, 'rgba(22, 119, 255, 0.28)')
  halo.addColorStop(1, 'rgba(22, 119, 255, 0)')
  ctx.fillStyle = halo
  ctx.fillRect(0, 0, SIZE, SIZE)

  ctx.strokeStyle = 'rgba(0, 170, 255, 0.5)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(c, c, radius, 0, Math.PI * 2)
  ctx.stroke()

  for (const cell of decodeLand()) {
    const p = project([cell.lat, cell.lon])
    if (p.depth <= 0.02) continue
    const size = cell.kind === 1 ? 2.6 : cell.kind === 2 ? 3.6 : 4.4
    ctx.fillStyle = `rgba(${COLORS[cell.kind]}, ${Math.min(1, p.depth * 1.6) * (cell.kind === 1 ? 0.55 : 0.95)})`
    ctx.beginPath()
    ctx.arc(c + p.x * radius, c - p.y * radius, size / 2 + 0.6, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.fillStyle = 'rgba(191, 246, 255, 0.95)'
  for (const node of GLOBE_NODES) {
    const p = project(node)
    if (p.depth <= 0.05) continue
    ctx.beginPath()
    ctx.arc(c + p.x * radius, c - p.y * radius, 3.4, 0, Math.PI * 2)
    ctx.fill()
  }

  const dakar = project(DAKAR)
  ctx.strokeStyle = 'rgba(191, 246, 255, 0.55)'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(c + dakar.x * radius, c - dakar.y * radius, 14, 0, Math.PI * 2)
  ctx.stroke()
}

/**
 * Représentation statique (Canvas 2D) du globe : affichée pendant le chargement de la scène
 * WebGL, et à sa place si WebGL est indisponible ou si le chargement échoue.
 */
export function GlobeFallback({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (ref.current) draw(ref.current)
  }, [])

  return <canvas ref={ref} width={SIZE} height={SIZE} aria-hidden className={className} />
}
