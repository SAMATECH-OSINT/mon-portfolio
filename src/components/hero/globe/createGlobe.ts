import {
  DoubleSide,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  Quaternion,
  RingGeometry,
  Scene,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from 'three'
import type { BufferAttribute, BufferGeometry, Material } from 'three'
import type { PointerState } from '@/hooks/usePointerParallax'
import { facing, toVec3 } from '@/lib/geo'
import { DAKAR, VIEW_CENTER } from './globeData'
import { ARC_SEGMENTS, buildGraticule, buildLand, buildNetwork } from './globeGeometry'
import { createGlowMaterial, createPointMaterial, createRimMaterial } from './globeShaders'

export interface GlobeOptions {
  /** Appareil modeste : moins de points et d'arcs, résolution réduite. */
  lowPower: boolean
  pointer: { current: PointerState }
  onContextLost: () => void
}

export interface GlobeHandle {
  resize: (width: number, height: number) => void
  /** Suspend / reprend le rendu (hors écran, onglet masqué). */
  setActive: (active: boolean) => void
  dispose: () => void
}

const REST = facing(VIEW_CENTER)
const OUTWARD = new Vector3(0, 0, 1)
const CAMERA_Z = 4.4

/**
 * Globe numérique en Three.js natif (sans React Three Fiber : ~40 % de JavaScript en moins).
 * Le rendu s'arrête tant que `setActive(false)` ; l'appelant gère le cycle de vie React.
 */
export function createGlobe(canvas: HTMLCanvasElement, options: GlobeOptions): GlobeHandle {
  const { lowPower, pointer, onContextLost } = options

  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: !lowPower, powerPreference: 'high-performance' })
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, lowPower ? 1.25 : 1.75))

  const scene = new Scene()
  const camera = new PerspectiveCamera(32, 1, 0.1, 20)
  camera.position.set(0, 0, CAMERA_Z)

  const disposables: Array<{ dispose: () => void }> = []
  const track = <T extends { dispose: () => void }>(item: T): T => {
    disposables.push(item)
    return item
  }

  // ── Coque : occlusion invisible, reflet du bord, halo ──────────────────
  const occluder = new MeshBasicMaterial({ colorWrite: false })
  const shell = new Group()
  const occluderMesh = new Mesh(track(new SphereGeometry(0.995, 48, 32)), track(occluder))
  occluderMesh.renderOrder = -1
  shell.add(
    occluderMesh,
    new Mesh(track(new SphereGeometry(1, 64, 48)), track(createRimMaterial())),
    new Mesh(track(new SphereGeometry(1.18, 48, 32)), track(createGlowMaterial())),
  )
  scene.add(shell)

  // ── Continents, réseau : tournent ensemble ────────────────────────────
  const pointMaterial = track(createPointMaterial())
  const world = new Group()
  world.rotation.set(REST.pitch, REST.yaw, 0)
  scene.add(world)

  const graticuleMaterial = track(
    new LineBasicMaterial({ color: 0x1677ff, transparent: true, opacity: 0.15, depthWrite: false }),
  )
  const arcMaterial = track(
    new LineBasicMaterial({ color: 0x00d9ff, transparent: true, opacity: 0.32, depthWrite: false }),
  )
  const network = buildNetwork(lowPower)
  const geometries: BufferGeometry[] = [buildGraticule(), buildLand(lowPower), network.lines, network.nodes, network.pulses]
  geometries.forEach((geometry) => track(geometry))
  const [graticule, land] = geometries as [BufferGeometry, BufferGeometry]

  world.add(
    new LineSegments(graticule, graticuleMaterial),
    new Points(land, pointMaterial),
    new LineSegments(network.lines, arcMaterial),
    new Points(network.nodes, pointMaterial),
    new Points(network.pulses, pointMaterial),
  )

  // ── Onde discrète sur Dakar : le Sénégal ressort sans emphase ─────────
  const beacon = new Group()
  const [bx, by, bz] = toVec3(DAKAR, 1.008)
  const beaconPosition = new Vector3(bx, by, bz)
  beacon.position.copy(beaconPosition)
  beacon.quaternion.copy(new Quaternion().setFromUnitVectors(OUTWARD, beaconPosition.clone().normalize()))
  const ringGeometry = track(new RingGeometry(0.03, 0.036, 48))
  const rings = [0, 1].map(() => {
    const material: Material & { opacity: number } = track(
      new MeshBasicMaterial({ color: 0xbff6ff, transparent: true, opacity: 0.4, depthWrite: false, side: DoubleSide }),
    )
    const ring = new Mesh(ringGeometry, material)
    beacon.add(ring)
    return { ring, material }
  })
  world.add(beacon)

  // ── Boucle de rendu ───────────────────────────────────────────────────
  const pulseAttribute = network.pulses.getAttribute('position') as BufferAttribute
  const pulsePositions = pulseAttribute.array as Float32Array
  let raf = 0
  let running = false
  let active = true
  let disposed = false
  let last = 0
  let elapsed = 0
  let width = 0

  const frame = (now: number) => {
    if (disposed) return
    const delta = last === 0 ? 0.016 : Math.min((now - last) / 1000, 0.1)
    last = now
    elapsed += delta

    // Balancement lent autour de l'Afrique + légère réaction à la souris.
    const yaw = REST.yaw + Math.sin(elapsed * 0.12) * 0.34 + pointer.current.x * 0.2
    const pitch = REST.pitch + pointer.current.y * 0.12
    const k = 1 - Math.exp(-delta * 3)
    world.rotation.y += (yaw - world.rotation.y) * k
    world.rotation.x += (pitch - world.rotation.x) * k

    // Flux lumineux le long des arcs.
    network.arcs.forEach((arc, i) => {
      const phase = (elapsed * 0.15 + i * 0.137) % 1
      const index = Math.min(ARC_SEGMENTS, Math.floor(phase * ARC_SEGMENTS)) * 3
      pulsePositions.set(arc.subarray(index, index + 3), i * 3)
    })
    pulseAttribute.needsUpdate = true

    rings.forEach(({ ring, material }, i) => {
      const phase = (elapsed * 0.45 + i * 0.5) % 1
      ring.scale.setScalar(0.5 + phase * 2.2)
      material.opacity = (1 - phase) * 0.55
    })

    renderer.render(scene, camera)
    raf = requestAnimationFrame(frame)
  }

  const start = () => {
    if (running || disposed || width === 0) return
    running = true
    last = 0
    raf = requestAnimationFrame(frame)
  }
  const stop = () => {
    running = false
    cancelAnimationFrame(raf)
  }

  const onVisibility = () => (document.hidden || !active ? stop() : start())
  const onLost = (event: Event) => {
    event.preventDefault()
    stop()
    onContextLost()
  }
  canvas.addEventListener('webglcontextlost', onLost)
  document.addEventListener('visibilitychange', onVisibility)

  return {
    resize(w, h) {
      if (w === 0 || h === 0) return
      width = w
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      // Les points gardent une taille proportionnelle à la hauteur réelle du canvas.
      pointMaterial.uniforms['uScale']!.value = (h * renderer.getPixelRatio()) / 700
      renderer.render(scene, camera)
      if (active && !document.hidden) start()
    },
    setActive(next) {
      active = next
      if (next && !document.hidden) start()
      else stop()
    },
    dispose() {
      disposed = true
      stop()
      canvas.removeEventListener('webglcontextlost', onLost)
      document.removeEventListener('visibilitychange', onVisibility)
      disposables.forEach((item) => item.dispose())
      renderer.dispose()
      renderer.forceContextLoss()
    },
  }
}
