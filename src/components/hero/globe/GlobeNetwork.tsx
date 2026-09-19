import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import {
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  LineBasicMaterial,
  MeshBasicMaterial,
  Quaternion,
  Vector3,
} from 'three'
import type { Mesh, ShaderMaterial } from 'three'
import { greatCircleArc, toVec3 } from '@/lib/geo'
import { DAKAR, GLOBE_ARCS, GLOBE_NODES } from './globeData'

const ARC_SEGMENTS = 44
const NODE_COLOR = [0.7, 0.96, 1.0] as const

interface GlobeNetworkProps {
  pointMaterial: ShaderMaterial
  animated: boolean
  lowPower: boolean
}

function pointGeometry(positions: Float32Array, size: number, color: readonly [number, number, number]) {
  const count = positions.length / 3
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count).fill(size)
  for (let i = 0; i < count; i++) colors.set(color, i * 3)
  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new BufferAttribute(positions, 3))
  geometry.setAttribute('aColor', new BufferAttribute(colors, 3))
  geometry.setAttribute('aSize', new BufferAttribute(sizes, 1))
  return geometry
}

/** Nœuds de données, liaisons et flux lumineux qui parcourent les arcs. */
export function GlobeNetwork({ pointMaterial, animated, lowPower }: GlobeNetworkProps) {
  const network = useMemo(() => {
    const arcs = (lowPower ? GLOBE_ARCS.slice(0, 6) : GLOBE_ARCS).map(([from, to]) =>
      greatCircleArc(from, to, ARC_SEGMENTS),
    )

    const lines = new Float32Array(arcs.length * ARC_SEGMENTS * 6)
    arcs.forEach((arc, i) => {
      for (let s = 0; s < ARC_SEGMENTS; s++) {
        lines.set(arc.subarray(s * 3, s * 3 + 3), (i * ARC_SEGMENTS + s) * 6)
        lines.set(arc.subarray((s + 1) * 3, (s + 1) * 3 + 3), (i * ARC_SEGMENTS + s) * 6 + 3)
      }
    })
    const lineGeometry = new BufferGeometry()
    lineGeometry.setAttribute('position', new BufferAttribute(lines, 3))

    const nodePositions = new Float32Array(GLOBE_NODES.length * 3)
    GLOBE_NODES.forEach((node, i) => nodePositions.set(toVec3(node, 1.006), i * 3))

    return {
      arcs,
      lineGeometry,
      lineMaterial: new LineBasicMaterial({ color: 0x00d9ff, transparent: true, opacity: 0.32, depthWrite: false }),
      nodes: pointGeometry(nodePositions, 4.6, NODE_COLOR),
      pulses: pointGeometry(new Float32Array(arcs.length * 3), 5.4, [1, 1, 1]),
    }
  }, [lowPower])

  useEffect(
    () => () => {
      network.lineGeometry.dispose()
      network.lineMaterial.dispose()
      network.nodes.dispose()
      network.pulses.dispose()
    },
    [network],
  )

  useFrame(({ clock }) => {
    const attribute = network.pulses.getAttribute('position') as BufferAttribute
    const positions = attribute.array as Float32Array
    const t = animated ? clock.elapsedTime : 3
    network.arcs.forEach((arc, i) => {
      const phase = (t * 0.15 + i * 0.137) % 1
      const index = Math.min(ARC_SEGMENTS, Math.floor(phase * ARC_SEGMENTS)) * 3
      positions.set(arc.subarray(index, index + 3), i * 3)
    })
    attribute.needsUpdate = true
  })

  return (
    <>
      <lineSegments geometry={network.lineGeometry} material={network.lineMaterial} />
      <points geometry={network.nodes} material={pointMaterial} />
      <points geometry={network.pulses} material={pointMaterial} />
      <SenegalBeacon animated={animated} />
    </>
  )
}

const OUTWARD = new Vector3(0, 0, 1)

/** Double onde discrète centrée sur Dakar : le Sénégal ressort sans emphase. */
function SenegalBeacon({ animated }: { animated: boolean }) {
  const rings = useRef<Array<Mesh | null>>([])
  const { position, quaternion } = useMemo(() => {
    const [x, y, z] = toVec3(DAKAR, 1.008)
    const p = new Vector3(x, y, z)
    return { position: p, quaternion: new Quaternion().setFromUnitVectors(OUTWARD, p.clone().normalize()) }
  }, [])
  const material = useMemo(
    () => [0, 1].map(() => new MeshBasicMaterial({ color: 0xbff6ff, transparent: true, opacity: 0.4, depthWrite: false, side: DoubleSide })),
    [],
  )

  useEffect(() => () => material.forEach((m) => m.dispose()), [material])

  useFrame(({ clock }) => {
    rings.current.forEach((ring, i) => {
      if (!ring) return
      const phase = animated ? (clock.elapsedTime * 0.45 + i * 0.5) % 1 : 0.35 + i * 0.3
      ring.scale.setScalar(0.5 + phase * 2.2)
      material[i]!.opacity = (1 - phase) * 0.55
    })
  })

  return (
    <group position={position} quaternion={quaternion}>
      {material.map((m, i) => (
        <mesh
          key={i}
          ref={(node) => {
            rings.current[i] = node
          }}
          material={m}
        >
          <ringGeometry args={[0.03, 0.036, 48]} />
        </mesh>
      ))}
    </group>
  )
}
