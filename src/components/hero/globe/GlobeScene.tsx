import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import type { MutableRefObject } from 'react'
import type { Group, ShaderMaterial } from 'three'
import type { PointerState } from '@/hooks/usePointerParallax'
import { facing } from '@/lib/geo'
import { VIEW_CENTER } from './globeData'
import { GlobeShell, LandLayer } from './GlobeLand'
import { GlobeNetwork } from './GlobeNetwork'
import { createPointMaterial } from './globeShaders'

interface GlobeSceneProps {
  /** `false` : image fixe (reduced motion). */
  animated: boolean
  /** `false` : rendu suspendu (hors écran). */
  active: boolean
  lowPower: boolean
  pointer: MutableRefObject<PointerState>
  onReady: () => void
  onContextLost: () => void
}

const REST = facing(VIEW_CENTER)

/** Les points gardent une taille proportionnelle à la hauteur réelle du canvas. */
function setPointScale(material: ShaderMaterial, scale: number): void {
  material.uniforms['uScale']!.value = scale
}

function GlobeContent({
  animated,
  lowPower,
  pointer,
}: Pick<GlobeSceneProps, 'animated' | 'lowPower' | 'pointer'>) {
  const group = useRef<Group>(null)
  const pointMaterial = useMemo(() => createPointMaterial(), [])

  useEffect(() => () => pointMaterial.dispose(), [pointMaterial])

  useFrame(({ clock, size, viewport }, delta) => {
    setPointScale(pointMaterial, (size.height * viewport.dpr) / 700)
    const g = group.current
    if (!g) return
    if (!animated) {
      g.rotation.set(REST.pitch, REST.yaw, 0)
      return
    }
    // Balancement lent autour de l'Afrique + légère réaction à la souris.
    const yaw = REST.yaw + Math.sin(clock.elapsedTime * 0.12) * 0.34 + pointer.current.x * 0.2
    const pitch = REST.pitch + pointer.current.y * 0.12
    const k = 1 - Math.exp(-delta * 3)
    g.rotation.y += (yaw - g.rotation.y) * k
    g.rotation.x += (pitch - g.rotation.x) * k
  })

  return (
    <>
      <GlobeShell />
      <group ref={group} rotation={[REST.pitch, REST.yaw, 0]}>
        <LandLayer pointMaterial={pointMaterial} lowPower={lowPower} />
        <GlobeNetwork pointMaterial={pointMaterial} animated={animated} lowPower={lowPower} />
      </group>
    </>
  )
}

/** Globe numérique WebGL. Chargé en différé, n'est jamais requis pour lire le contenu. */
export default function GlobeScene({ animated, active, lowPower, pointer, onReady, onContextLost }: GlobeSceneProps) {
  return (
    <Canvas
      frameloop={!active ? 'never' : animated ? 'always' : 'demand'}
      dpr={[1, lowPower ? 1.25 : 1.75]}
      camera={{ position: [0, 0, 4.4], fov: 32, near: 0.1, far: 20 }}
      gl={{ antialias: !lowPower, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (event) => {
          event.preventDefault()
          onContextLost()
        })
        onReady()
      }}
    >
      <GlobeContent animated={animated} lowPower={lowPower} pointer={pointer} />
    </Canvas>
  )
}
