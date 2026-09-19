import { memo } from 'react'
import { sectionOrder } from '@/data/navigation'
import { HeroSection } from './HeroSection'
import { PlaceholderSection } from './PlaceholderSection'

/**
 * Enchaînement des sections. Mémoïsé : le changement de section active
 * (état de l'App) ne doit pas re-rendre toute la page.
 */
export const PageSections = memo(function PageSections() {
  return (
    <>
      {sectionOrder.map((id) =>
        id === 'home' ? <HeroSection key={id} /> : <PlaceholderSection key={id} id={id} phase="Phase 6" />,
      )}
    </>
  )
})
