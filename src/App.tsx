import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion'
import { Fragment } from 'react'
import { SkipLink } from '@/components/layout/SkipLink'
import { Navbar } from '@/components/navigation/Navbar'
import { sectionOrder } from '@/data/navigation'
import { PlaceholderSection } from '@/sections/PlaceholderSection'
import { StyleGuide } from '@/sections/StyleGuide'

/**
 * Shell provisoire (Phases 2–3) : chaque section est un placeholder ancré,
 * ce qui permet de valider la navigation, le scroll et l'état actif.
 * Les vraies sections remplacent les placeholders à partir de la Phase 5.
 */
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <SkipLink />
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          {sectionOrder.map((id) => (
            <Fragment key={id}>
              <PlaceholderSection id={id} phase={id === 'home' ? 'Phase 5' : 'Phase 6'} />
              {id === 'home' && <StyleGuide />}
            </Fragment>
          ))}
        </main>
      </LazyMotion>
    </MotionConfig>
  )
}
