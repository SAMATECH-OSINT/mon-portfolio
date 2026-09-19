import { BufferAttribute, BufferGeometry } from 'three'
import { decodeLand, greatCircleArc, toVec3 } from '@/lib/geo'
import type { LandKind } from '@/lib/geo'
import { GLOBE_ARCS, GLOBE_NODES } from './globeData'

type Rgb = readonly [number, number, number]

/** Couleur (RVB 0–1) et taille des points selon la zone. */
const LAND_STYLE: Record<LandKind, { color: Rgb; size: number }> = {
  1: { color: [0.1, 0.36, 0.85], size: 2.5 },
  2: { color: [0.0, 0.85, 1.0], size: 4.1 },
  3: { color: [0.85, 1.0, 1.0], size: 5.0 },
}

const GRATICULE_RADIUS = 1.001
const CIRCLE_SEGMENTS = 96
export const ARC_SEGMENTS = 44
const NODE_COLOR: Rgb = [0.7, 0.96, 1.0]

/** Géométrie de points avec les attributs attendus par le shader (`aColor`, `aSize`). */
function pointGeometry(positions: Float32Array, sizes: Float32Array, colors: Float32Array): BufferGeometry {
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('aColor', new BufferAttribute(colors, 3))
  geometry.setAttribute('aSize', new BufferAttribute(sizes, 1))
  return geometry
}

function uniformPoints(positions: Float32Array, size: number, color: Rgb): BufferGeometry {
  const count = positions.length / 3
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) colors.set(color, i * 3)
  return pointGeometry(positions, new Float32Array(count).fill(size), colors)
}

/** Continents : un point par cellule de terre du masque. `thin` en retire une sur deux hors Afrique. */
export function buildLand(thin: boolean): BufferGeometry {
  const cells = decodeLand(thin)
  const positions = new Float32Array(cells.length * 3)
  const colors = new Float32Array(cells.length * 3)
  const sizes = new Float32Array(cells.length)
  cells.forEach((cell, i) => {
    const style = LAND_STYLE[cell.kind]
    positions.set(toVec3([cell.lat, cell.lon], 1.003), i * 3)
    colors.set(style.color, i * 3)
    sizes[i] = style.size
  })
  return pointGeometry(positions, sizes, colors)
}

/** Parallèles (tous les 30°) et méridiens en segments de lignes. */
export function buildGraticule(): BufferGeometry {
  const points: number[] = []
  const push = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    points.push(...toVec3([lat1, lon1], GRATICULE_RADIUS), ...toVec3([lat2, lon2], GRATICULE_RADIUS))
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    for (let i = 0; i < CIRCLE_SEGMENTS; i++) {
      push(lat, (i / CIRCLE_SEGMENTS) * 360 - 180, lat, ((i + 1) / CIRCLE_SEGMENTS) * 360 - 180)
    }
  }
  const half = CIRCLE_SEGMENTS / 2
  for (let lon = -180; lon < 180; lon += 30) {
    for (let i = 0; i < half; i++) {
      push(-90 + (i / half) * 180, lon, -90 + ((i + 1) / half) * 180, lon)
    }
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(points), 3))
  return geometry
}

export interface NetworkGeometry {
  /** Points de chaque arc, pour animer les flux lumineux. */
  arcs: Float32Array[]
  lines: BufferGeometry
  nodes: BufferGeometry
  pulses: BufferGeometry
}

/** Arcs de liaison, nœuds de données et flux (un point mobile par arc). */
export function buildNetwork(lowPower: boolean): NetworkGeometry {
  const arcs = (lowPower ? GLOBE_ARCS.slice(0, 6) : GLOBE_ARCS).map(([from, to]) =>
    greatCircleArc(from, to, ARC_SEGMENTS),
  )

  const segments = new Float32Array(arcs.length * ARC_SEGMENTS * 6)
  arcs.forEach((arc, i) => {
    for (let s = 0; s < ARC_SEGMENTS; s++) {
      segments.set(arc.subarray(s * 3, s * 3 + 3), (i * ARC_SEGMENTS + s) * 6)
      segments.set(arc.subarray((s + 1) * 3, (s + 1) * 3 + 3), (i * ARC_SEGMENTS + s) * 6 + 3)
    }
  })
  const lines = new BufferGeometry()
  lines.setAttribute('position', new BufferAttribute(segments, 3))

  const nodePositions = new Float32Array(GLOBE_NODES.length * 3)
  GLOBE_NODES.forEach((node, i) => nodePositions.set(toVec3(node, 1.006), i * 3))

  return {
    arcs,
    lines,
    nodes: uniformPoints(nodePositions, 4.6, NODE_COLOR),
    pulses: uniformPoints(new Float32Array(arcs.length * 3), 5.4, [1, 1, 1]),
  }
}
