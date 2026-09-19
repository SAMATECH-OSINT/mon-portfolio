/**
 * Moteur du background global : réseau de nœuds en profondeur (Canvas 2D).
 * Pas de dépendance React : le composant pilote le cycle de vie, ce module dessine.
 */

const CYAN = '0, 217, 255'
const BLUE = '22, 119, 255'

/** Ancrage (0–1) du halo principal, par section. */
export interface GlowAnchor {
  x: number
  y: number
}

interface FieldNode {
  /** Position normalisée (0–1). */
  x: number
  y: number
  /** Profondeur : 0.2 (loin) → 1 (proche). */
  z: number
  vx: number
  vy: number
  hub: boolean
  phase: number
}

interface Pulse {
  a: number
  b: number
  t: number
  speed: number
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))
const mod = (v: number, m: number) => ((v % m) + m) % m

/** Générateur pseudo-aléatoire déterministe (mulberry32) : disposition stable d'une visite à l'autre. */
function createRng(seed: number) {
  let s = seed
  return () => {
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export class NetworkField {
  private nodes: FieldNode[] = []
  private pulses: Pulse[] = []
  private px = new Float32Array(0)
  private py = new Float32Array(0)
  private fade = new Float32Array(0)

  private width = 0
  private height = 0
  private linkDist = 150
  private quality = 1
  private elapsed = 0

  private pointer = { x: 0, y: 0 }
  private pointerTarget = { x: 0, y: 0 }
  private scroll = 0
  private scrollTarget = 0
  private glow: GlowAnchor = { x: 0.72, y: 0.35 }
  private glowTarget: GlowAnchor = { x: 0.72, y: 0.35 }

  private readonly rng = createRng(20260919)
  private readonly buckets: number[][] = [[], [], []]

  constructor(
    private readonly ctx: CanvasRenderingContext2D,
    private readonly animated: boolean,
  ) {}

  get nodeCount(): number {
    return this.nodes.length
  }

  resize(width: number, height: number, dpr: number): void {
    this.width = width
    this.height = height
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    this.linkDist = width < 768 ? 115 : clamp(width * 0.11, 120, 170)
    this.syncNodeCount()
  }

  setPointer(x: number, y: number): void {
    this.pointerTarget.x = x
    this.pointerTarget.y = y
  }

  setScroll(y: number): void {
    this.scrollTarget = y
  }

  setMood(anchor: GlowAnchor): void {
    this.glowTarget = anchor
  }

  /** Réduit la densité de 25 % (dégradation adaptative si les images sont lentes). */
  reduceDensity(): void {
    this.quality = Math.max(0.4, this.quality * 0.75)
    this.syncNodeCount()
  }

  update(dt: number): void {
    this.elapsed += dt
    const fast = 1 - Math.exp(-dt * 4)
    const slow = 1 - Math.exp(-dt * 0.9)
    this.pointer.x += (this.pointerTarget.x - this.pointer.x) * fast
    this.pointer.y += (this.pointerTarget.y - this.pointer.y) * fast
    this.scroll += (this.scrollTarget - this.scroll) * fast
    this.glow.x += (this.glowTarget.x - this.glow.x) * slow
    this.glow.y += (this.glowTarget.y - this.glow.y) * slow

    for (const n of this.nodes) {
      n.x = mod(n.x + n.vx * dt * (0.4 + n.z), 1)
      n.y = mod(n.y + n.vy * dt * (0.4 + n.z), 1)
    }
    for (const p of this.pulses) p.t += p.speed * dt
  }

  render(): void {
    const { ctx, width: W, height: H, nodes } = this
    ctx.clearRect(0, 0, W, H)
    if (W === 0 || H === 0) return

    this.drawGlows(W, H)

    const n = nodes.length
    const parallaxX = this.pointer.x * 26
    const parallaxY = this.pointer.y * 18
    for (let i = 0; i < n; i++) {
      const node = nodes[i]!
      this.px[i] = node.x * W + parallaxX * node.z
      this.py[i] = mod(node.y * H + parallaxY * node.z - this.scroll * node.z * 0.16, H)
      const edge = Math.min(this.py[i]!, H - this.py[i]!)
      this.fade[i] = clamp(edge / 90, 0, 1)
    }

    this.drawLinks(n)
    this.drawNodes(n)
    this.updatePulses(n)
  }

  // ── Dessin ──────────────────────────────────────────────────────────────

  private drawGlows(W: number, H: number): void {
    const { ctx } = this
    const reach = Math.max(W, H)

    const gx = this.glow.x * W + this.pointer.x * 40
    const gy = this.glow.y * H + this.pointer.y * 30
    const primary = ctx.createRadialGradient(gx, gy, 0, gx, gy, reach * 0.6)
    primary.addColorStop(0, `rgba(${BLUE}, 0.16)`)
    primary.addColorStop(1, `rgba(${BLUE}, 0)`)
    ctx.fillStyle = primary
    ctx.fillRect(0, 0, W, H)

    const sx = W * (0.5 + this.pointer.x * 0.32)
    const sy = H * (0.5 + this.pointer.y * 0.32)
    const secondary = ctx.createRadialGradient(sx, sy, 0, sx, sy, reach * 0.38)
    secondary.addColorStop(0, `rgba(${CYAN}, 0.055)`)
    secondary.addColorStop(1, `rgba(${CYAN}, 0)`)
    ctx.fillStyle = secondary
    ctx.fillRect(0, 0, W, H)
  }

  private drawLinks(n: number): void {
    const { ctx, buckets, nodes, linkDist } = this
    const maxSq = linkDist * linkDist
    for (const b of buckets) b.length = 0

    for (let i = 0; i < n; i++) {
      if (this.fade[i]! < 0.25) continue
      for (let j = i + 1; j < n; j++) {
        if (this.fade[j]! < 0.25) continue
        if (Math.abs(nodes[i]!.z - nodes[j]!.z) > 0.45) continue
        const dx = this.px[i]! - this.px[j]!
        const dy = this.py[i]! - this.py[j]!
        const d2 = dx * dx + dy * dy
        if (d2 >= maxSq) continue
        const level = Math.min(2, Math.floor((1 - Math.sqrt(d2) / linkDist) * 3))
        buckets[level]!.push(this.px[i]!, this.py[i]!, this.px[j]!, this.py[j]!)
      }
    }

    const styles = [`rgba(${BLUE}, 0.08)`, `rgba(${BLUE}, 0.17)`, `rgba(${CYAN}, 0.26)`]
    ctx.lineWidth = 1
    buckets.forEach((segments, level) => {
      if (segments.length === 0) return
      ctx.strokeStyle = styles[level]!
      ctx.beginPath()
      for (let k = 0; k < segments.length; k += 4) {
        ctx.moveTo(segments[k]!, segments[k + 1]!)
        ctx.lineTo(segments[k + 2]!, segments[k + 3]!)
      }
      ctx.stroke()
    })
  }

  private drawNodes(n: number): void {
    const { ctx, nodes } = this
    for (const [near, color] of [
      [false, `rgba(${BLUE}, 0.55)`],
      [true, `rgba(${CYAN}, 0.8)`],
    ] as const) {
      ctx.fillStyle = color
      ctx.beginPath()
      for (let i = 0; i < n; i++) {
        const node = nodes[i]!
        if ((node.z >= 0.55) !== near) continue
        const r = 0.7 + node.z * 1.3
        const x = this.px[i]!
        const y = this.py[i]!
        ctx.moveTo(x + r, y)
        ctx.arc(x, y, r, 0, Math.PI * 2)
      }
      ctx.fill()
    }

    // Hubs : anneau discret qui « respire ».
    ctx.lineWidth = 1
    for (let i = 0; i < n; i++) {
      const node = nodes[i]!
      if (!node.hub || this.fade[i]! < 0.5) continue
      const breath = 0.5 + 0.5 * Math.sin(this.elapsed * 0.9 + node.phase)
      ctx.strokeStyle = `rgba(${CYAN}, ${0.1 + breath * 0.16})`
      ctx.beginPath()
      ctx.arc(this.px[i]!, this.py[i]!, 4 + node.z * 3 + breath * 2, 0, Math.PI * 2)
      ctx.stroke()
    }
  }

  private updatePulses(n: number): void {
    if (!this.animated || n < 8) return
    const { ctx } = this
    const wanted = this.width < 768 ? 2 : 5
    while (this.pulses.length < wanted) this.pulses.push({ a: -1, b: -1, t: 1, speed: 0 })

    for (const p of this.pulses) {
      if (p.t >= 1) this.retarget(p, n)
      if (p.a < 0) continue
      const x = this.px[p.a]! + (this.px[p.b]! - this.px[p.a]!) * p.t
      const y = this.py[p.a]! + (this.py[p.b]! - this.py[p.a]!) * p.t
      const strength = Math.sin(p.t * Math.PI)
      ctx.fillStyle = `rgba(${CYAN}, ${0.16 * strength})`
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = `rgba(245, 247, 250, ${0.9 * strength})`
      ctx.beginPath()
      ctx.arc(x, y, 1.6, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  /** Choisit une arête existante (paire de nœuds proches) pour le prochain flux de données. */
  private retarget(pulse: Pulse, n: number): void {
    const maxSq = this.linkDist * this.linkDist * 0.7
    for (let attempt = 0; attempt < 14; attempt++) {
      const a = Math.floor(this.rng() * n)
      const b = Math.floor(this.rng() * n)
      if (a === b || this.fade[a]! < 0.5 || this.fade[b]! < 0.5) continue
      const dx = this.px[a]! - this.px[b]!
      const dy = this.py[a]! - this.py[b]!
      const d2 = dx * dx + dy * dy
      if (d2 > maxSq || d2 < 400) continue
      pulse.a = a
      pulse.b = b
      pulse.t = 0
      pulse.speed = 0.35 + this.rng() * 0.3
      return
    }
    pulse.a = -1
    pulse.t = 0.6
  }

  // ── Population ──────────────────────────────────────────────────────────

  private syncNodeCount(): void {
    const mobile = this.width < 768
    const raw = (this.width * this.height) / (mobile ? 11000 : 24000)
    const target = Math.round(clamp(raw, 20, mobile ? 34 : 88) * this.quality)

    while (this.nodes.length < target) this.nodes.push(this.createNode())
    if (this.nodes.length > target) this.nodes.length = target

    this.px = new Float32Array(target)
    this.py = new Float32Array(target)
    this.fade = new Float32Array(target)
    this.pulses = []
  }

  private createNode(): FieldNode {
    const r = this.rng
    const z = 0.2 + Math.pow(r(), 1.6) * 0.8
    const angle = r() * Math.PI * 2
    const speed = 0.004 + r() * 0.008
    return {
      x: r(),
      y: r(),
      z,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      hub: r() < 0.11,
      phase: r() * Math.PI * 2,
    }
  }
}
