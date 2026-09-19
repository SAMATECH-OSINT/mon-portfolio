import { useReducedMotion } from 'framer-motion'
import { lazy, Suspense, useState } from 'react'
import { RenderBoundary } from '@/components/ui/RenderBoundary'
import { useIdleReady } from '@/hooks/useIdleReady'
import { useInView } from '@/hooks/useInView'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePointerParallax } from '@/hooks/usePointerParallax'
import { cn } from '@/lib/cn'
import { isWebGLAvailable } from '@/lib/webgl'
import { GlobeFallback } from './GlobeFallback'

const GlobeScene = lazy(() => import('./globe/GlobeScene'))

const LABEL =
  'Globe numérique stylisé : l’Afrique, un réseau de nœuds de données et des connexions internationales, avec le Sénégal légèrement mis en évidence.'

function prefersSavingData(): boolean {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return connection?.saveData === true
}

interface HeroVisualProps {
  className?: string
}

/**
 * Globe du Hero. Le rendu Canvas 2D est immédiat ; la scène WebGL (Three.js) est chargée
 * en différé, puis fondue par-dessus. Aucun état de la scène ne bloque le contenu.
 */
export function HeroVisual({ className }: HeroVisualProps) {
  const reduceMotion = useReducedMotion() ?? false
  // Mobile : le globe reste en Canvas 2D (aucun coût Three.js, ~240 kB gzip économisés).
  const compact = useMediaQuery('(max-width: 767px)')
  const lowPower = navigator.hardwareConcurrency <= 4
  const idle = useIdleReady(1200)
  const [supported] = useState(() => isWebGLAvailable() && !prefersSavingData())
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [containerRef, inView] = useInView<HTMLDivElement>()
  const pointer = usePointerParallax(!reduceMotion && !compact)

  const useWebGL = supported && idle && !failed && !compact

  const fail = () => {
    setFailed(true)
    setReady(false)
  }

  return (
    <div ref={containerRef} role="img" aria-label={LABEL} className={cn('relative aspect-square', className)}>
      <GlobeFallback
        className={cn('absolute inset-0 size-full transition-opacity duration-1000 motion-reduce:transition-none', ready && 'opacity-0')}
      />
      {useWebGL && (
        <RenderBoundary fallback={null} onError={fail}>
          <Suspense fallback={null}>
            <div className={cn('absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none', ready ? 'opacity-100' : 'opacity-0')}>
              <GlobeScene
                animated={!reduceMotion}
                active={inView}
                lowPower={lowPower}
                pointer={pointer}
                onReady={() => setReady(true)}
                onContextLost={fail}
              />
            </div>
          </Suspense>
        </RenderBoundary>
      )}
    </div>
  )
}
