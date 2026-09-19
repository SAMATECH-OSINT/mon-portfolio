import { lazy, Suspense } from 'react'
import { Footer } from '@/components/footer/Footer'
import { SkipLink } from '@/components/layout/SkipLink'
import { Navbar } from '@/components/navigation/Navbar'
import { sectionOrder } from '@/data/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useIdleReady } from '@/hooks/useIdleReady'
import { PageSections } from '@/sections/PageSections'

// Décoratif : chargé après le premier rendu pour ne jamais retarder le contenu.
const BackgroundCanvas = lazy(() => import('@/components/background/BackgroundCanvas'))

export default function App() {
  const activeSection = useActiveSection(sectionOrder)
  const idle = useIdleReady()

  return (
    <>
      <SkipLink />
      {idle && (
        <Suspense fallback={null}>
          <BackgroundCanvas activeSection={activeSection} />
        </Suspense>
      )}
      <Navbar activeSection={activeSection} />
      <main id="main" tabIndex={-1} className="relative z-10 outline-none">
        <PageSections />
      </main>
      <Footer />
    </>
  )
}
