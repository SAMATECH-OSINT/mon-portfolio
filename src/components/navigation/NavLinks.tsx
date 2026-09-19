import { navItems } from '@/data/navigation'
import { cn } from '@/lib/cn'

interface NavLinksProps {
  /** Id de la navigation courante (section visible). */
  activeTarget: string | undefined
  orientation: 'horizontal' | 'vertical'
  onNavigate?: () => void
}

export function NavLinks({ activeTarget, orientation, onNavigate }: NavLinksProps) {
  const vertical = orientation === 'vertical'
  return (
    <ul className={cn('flex', vertical ? 'flex-col gap-1' : 'items-center gap-1')}>
      {navItems.map((item) => {
        const active = item.target === activeTarget
        return (
          <li key={item.target}>
            <a
              href={`#${item.target}`}
              onClick={onNavigate}
              aria-current={active ? 'location' : undefined}
              className={cn(
                'relative block rounded-full transition-colors duration-300',
                vertical ? 'px-4 py-3 font-display text-xl' : 'px-3 py-2 text-[0.8125rem] font-medium',
                active ? 'text-white' : 'text-ink-muted hover:text-white',
              )}
            >
              {item.label}
              {!vertical && (
                <span
                  aria-hidden
                  className={cn(
                    'absolute inset-x-3 -bottom-px h-px bg-linear-to-r from-transparent via-cyan to-transparent transition-opacity duration-300',
                    active ? 'opacity-100' : 'opacity-0',
                  )}
                />
              )}
              {vertical && active && (
                <span aria-hidden className="ml-3 inline-block size-1.5 rounded-full bg-cyan align-middle" />
              )}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
