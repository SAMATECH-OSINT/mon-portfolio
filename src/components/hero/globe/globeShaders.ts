import { AddEquation, BackSide, CustomBlending, OneFactor, ShaderMaterial } from 'three'

/**
 * Additif en alpha pré-multiplié : la couleur s'ajoute, mais l'alpha du canvas ne croît
 * qu'à hauteur de la lumière émise. Avec un additif classique, les zones « noires » du
 * halo deviendraient opaques et dessineraient un disque sombre sur la page.
 */
const additive = {
  blending: CustomBlending,
  blendEquation: AddEquation,
  blendSrc: OneFactor,
  blendDst: OneFactor,
} as const

/**
 * Points ronds et doux. La transparence dépend de l'orientation par rapport à la
 * caméra : les points de la face cachée s'estompent (profondeur sans surcharge).
 */
const pointVertex = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uScale;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 n = normalize(normalMatrix * normalize(position));
    vAlpha = smoothstep(-0.12, 0.4, n.z);
    vColor = aColor;
    gl_PointSize = aSize * uScale * (4.4 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`

const pointFragment = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.12, d) * vAlpha;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor * a, a);
  }
`

export function createPointMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    uniforms: { uScale: { value: 1 } },
    vertexShader: pointVertex,
    fragmentShader: pointFragment,
    transparent: true,
    depthWrite: false,
    ...additive,
  })
}

/** Lueur du bord de la sphère (verre). */
export function createRimMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    uniforms: {},
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vView = -mv.xyz;
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vNormal;
      varying vec3 vView;
      void main() {
        float f = 1.0 - max(dot(normalize(vNormal), normalize(vView)), 0.0);
        float rim = pow(f, 3.2);
        vec3 color = vec3(0.0, 0.62, 1.0) * (rim * 0.85 + 0.035);
        gl_FragColor = vec4(color, max(color.r, max(color.g, color.b)));
      }
    `,
    transparent: true,
    depthWrite: false,
    ...additive,
  })
}

/** Halo atmosphérique autour du globe. */
export function createGlowMaterial(): ShaderMaterial {
  return new ShaderMaterial({
    uniforms: {},
    vertexShader: /* glsl */ `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec3 vNormal;
      void main() {
        float i = pow(clamp(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 0.0, 1.5), 3.0);
        vec3 color = vec3(0.05, 0.42, 1.0) * i * 0.32;
        gl_FragColor = vec4(color, max(color.r, max(color.g, color.b)));
      }
    `,
    side: BackSide,
    transparent: true,
    depthWrite: false,
    ...additive,
  })
}
