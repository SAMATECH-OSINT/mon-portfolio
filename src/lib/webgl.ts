/** Détecte un contexte WebGL exploitable (le navigateur peut l'exposer mais le refuser). */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    const ok = gl !== null
    gl?.getExtension('WEBGL_lose_context')?.loseContext()
    return ok
  } catch {
    return false
  }
}
