import { useEffect, useMemo } from 'react'
import {
  BufferAttribute,
  BufferGeometry,
  LineBasicMaterial,
  MeshBasicMaterial,
} from 'three'
import type { ShaderMaterial } from 'three'
import { decodeLand, toVec3 } from '@/lib/geo'
import type { LandKind } from '@/lib/geo'
import { createGlowMaterial, createRimMaterial } from './globeShaders'

/** Couleur (RVB 0–1) et taille des points selon la zone. */
const LAND_STYLE: Record<LandKind, { color: readonly [number, number, number]; size: number }> = {
  1: { color: [0.1, 0.36, 0.85], size: 2.5 },
  2: { color: [0.0, 0.85, 1.0], size: 4.1 },
  3: { color: [0.85, 1.0, 1.0], size: 5.0 },
}

const GRATICULE_RADIUS = 1.001
const CIRCLE_SEGMENTS = 96

function buildGraticule(): BufferGeometry {
  const points: number[] = []
  const push = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    points.push(...toVec3([lat1, lon1], GRATICULE_RADIUS), ...toVec3([lat2, lon2], GRATICULE_RADIUS))
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    for (let i = 0; i < CIRCLE_SEGMENTS; i++) {
      push(lat, (i / CIRCLE_SEGMENTS) * 360 - 180, lat, ((i + 1) / CIRCLE_SEGMENTS) * 360 - 180)
    }
  }
  for (let lon = -180; lon < 180; lon += 30) {
    for (let i = 0; i < CIRCLE_SEGMENTS / 2; i++) {
      push(-90 + (i / (CIRCLE_SEGMENTS / 2)) * 180, lon, -90 + ((i + 1) / (CIRCLE_SEGMENTS / 2)) * 180, lon)
    }
  }
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(new Float32Array(points), 3))
  return geometry
}

function buildLand(thin: boolean): BufferGeometry {
  const cells = decodeLand(thin)
  const position = new Float32Array(cells.length * 3)
  const color = new Float32Array(cells.length * 3)
  const size = new Float32Array(cells.length)
  cells.forEach((cell, i) => {
    const style = LAND_STYLE[cell.kind]
    position.set(toVec3([cell.lat, cell.lon], 1.003), i * 3)
    color.set(style.color, i * 3)
    size[i] = style.size
  })
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(position, 3))
  geometry.setAttribute('aColor', new BufferAttribute(color, 3))
  geometry.setAttribute('aSize', new BufferAttribute(size, 1))
  return geometry
}

interface LandLayerProps {
  pointMaterial: ShaderMaterial
  /** Appareil modeste : moins de points. */
  lowPower: boolean
}

/** Continents en points + graticule. Tourne avec le globe. */
export function LandLayer({ pointMaterial, lowPower }: LandLayerProps) {
  const resources = useMemo(
    () => ({
      land: buildLand(lowPower),
      graticule: buildGraticule(),
      lineMaterial: new LineBasicMaterial({ color: 0x1677ff, transparent: true, opacity: 0.15, depthWrite: false }),
    }),
    [lowPower],
  )

  useEffect(
    () => () => {
      resources.land.dispose()
      resources.graticule.dispose()
      resources.lineMaterial.dispose()
    },
    [resources],
  )

  return (
    <>
      <lineSegments geometry={resources.graticule} material={resources.lineMaterial} />
      <points geometry={resources.land} material={pointMaterial} />
    </>
  )
}

/** Occlusion invisible, reflets du bord et halo. Symétrique : ne tourne pas. */
export function GlobeShell() {
  const materials = useMemo(
    () => ({
      occluder: new MeshBasicMaterial({ colorWrite: false }),
      rim: createRimMaterial(),
      glow: createGlowMaterial(),
    }),
    [],
  )

  useEffect(
    () => () => {
      materials.occluder.dispose()
      materials.rim.dispose()
      materials.glow.dispose()
    },
    [materials],
  )

  return (
    <>
      {/* Écrit uniquement la profondeur : masque la face arrière sans dessiner de disque. */}
      <mesh material={materials.occluder} renderOrder={-1}>
        <sphereGeometry args={[0.995, 48, 32]} />
      </mesh>
      <mesh material={materials.rim}>
        <sphereGeometry args={[1, 64, 48]} />
      </mesh>
      <mesh material={materials.glow}>
        <sphereGeometry args={[1.18, 48, 32]} />
      </mesh>
    </>
  )
}
