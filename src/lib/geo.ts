import { GLOBE_MASK, GLOBE_STEP } from '@/assets/globeLand'

export type LatLon = readonly [lat: number, lon: number]
export type Vec3 = readonly [x: number, y: number, z: number]

/** 1 terre · 2 Afrique · 3 Sénégal. */
export type LandKind = 1 | 2 | 3

export interface LandCell {
  lat: number
  lon: number
  kind: LandKind
}

const DEG = Math.PI / 180

/** Convention Three.js : la longitude −90° fait face à +Z lorsque le globe n'est pas tourné. */
export function toVec3([lat, lon]: LatLon, radius = 1): Vec3 {
  const phi = (90 - lat) * DEG
  const theta = (lon + 180) * DEG
  return [-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta)]
}

/** Rotation (yaw, pitch) qui amène un point (lat, lon) face à la caméra. */
export function facing([lat, lon]: LatLon): { yaw: number; pitch: number } {
  return { yaw: -(lon + 90) * DEG, pitch: lat * DEG }
}

/**
 * Décode le masque terrestre généré (voir scripts/generate-globe-data.mjs).
 * `thin` retire une cellule sur deux hors Afrique pour les appareils modestes.
 */
export function decodeLand(thin = false): LandCell[] {
  const cells: LandCell[] = []
  GLOBE_MASK.split('|').forEach((row, r) => {
    const lat = 90 - GLOBE_STEP * (r + 0.5)
    let c = 0
    for (const run of row.split(';')) {
      const kind = Number(run[0])
      const length = Number(run.slice(1))
      if (kind !== 0) {
        for (let k = 0; k < length; k++) {
          const col = c + k
          if (thin && kind === 1 && (r + col) % 2 === 1) continue
          cells.push({ lat, lon: -180 + GLOBE_STEP * (col + 0.5), kind: kind as LandKind })
        }
      }
      c += length
    }
  })
  return cells
}

/** Arc de grand cercle relevé au-dessus de la sphère (intégré en points XYZ consécutifs). */
export function greatCircleArc(from: LatLon, to: LatLon, segments: number): Float32Array {
  const [ax, ay, az] = toVec3(from)
  const [bx, by, bz] = toVec3(to)
  const omega = Math.acos(Math.min(1, Math.max(-1, ax * bx + ay * by + az * bz)))
  const sinOmega = Math.sin(omega) || 1
  const lift = 0.06 + 0.22 * (omega / Math.PI)

  const out = new Float32Array((segments + 1) * 3)
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const wa = Math.sin((1 - t) * omega) / sinOmega
    const wb = Math.sin(t * omega) / sinOmega
    const radius = 1 + lift * Math.sin(Math.PI * t)
    out[i * 3] = (wa * ax + wb * bx) * radius
    out[i * 3 + 1] = (wa * ay + wb * by) * radius
    out[i * 3 + 2] = (wa * az + wb * bz) * radius
  }
  return out
}
