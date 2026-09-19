import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Button } from '@/components/ui/Button'
import { navCta, navItems } from '@/data/navigation'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { cn } from '@/lib/cn'
import { Logo } from './Logo'
import { NavLinks } from './NavLinks'

const FOCUSABLE = 'a[href], button:not([disabled])'

interface NavbarProps {
  /** Identifiant de la section actuellement visible. */
  activeSection: string
}

export function Navbar({ activeSection }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const activeTarget = navItems.find((item) => item.sections.includes(activeSection))?.target

  const { barRef, scrolled } = useScrollProgress()

  useBodyScrollLock(open)

  const close = useCallback(() => setOpen(false), [])

  // Menu mobile : Échap pour fermer, piège de focus dans l'en-tête, retour du focus au bouton.
  useEffect(() => {
    if (!open) return
    const header = headerRef.current
    const toggle = toggleRef.current
    header?.querySelector<HTMLElement>('#mobile-menu a')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        return
      }
      if (event.key !== 'Tab' || !header) return
      const items = Array.from(header.querySelectorAll<HTMLElement>(FOCUSABLE))
      const first = items[0]
      const last = items[items.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      toggle?.focus({ preventScroll: true })
    }
  }, [open])

  // Repasse en desktop : le menu mobile ne doit pas rester ouvert.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1280px)')
    const onChange = () => query.matches && setOpen(false)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'transition-[background-color,border-color,backdrop-filter] duration-500',
          'border-b',
          scrolled || open
            ? 'border-line bg-navy-950/80 backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <Container>
          <nav aria-label="Navigation principale" className="flex h-16 items-center justify-between gap-4">
            <Logo onNavigate={close} />

            <div className="hidden xl:block">
              <NavLinks activeTarget={activeTarget} orientation="horizontal" />
            </div>

            <div className="flex items-center gap-3">
              <Button href={`#${navCta.target}`} size="md" className="max-sm:hidden">
                {navCta.label}
              </Button>
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                className="grid size-10 place-items-center rounded-full border border-line-strong text-ink transition-colors hover:border-cyan/60 xl:hidden"
              >
                {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
              </button>
            </div>
          </nav>
        </Container>
      </div>

      {/* Progression de lecture */}
      <div
        ref={barRef}
        aria-hidden
        style={{ transform: 'scaleX(0)' }}
        className="h-px origin-left bg-linear-to-r from-electric via-cyan to-cyan"
      />

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16.25 bottom-0 overflow-y-auto border-t border-line bg-navy-950/95 backdrop-blur-xl motion-safe:animate-swap-in xl:hidden"
        >
          <Container className="flex min-h-full flex-col justify-between gap-10 py-8">
            <NavLinks activeTarget={activeTarget} orientation="vertical" onNavigate={close} />
            <Button href={`#${navCta.target}`} size="lg" onClick={close} className="w-full sm:hidden">
              {navCta.label}
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
