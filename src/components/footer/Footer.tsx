import { ArrowUp } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { Icon } from '@/components/ui/Icon'
import { profile } from '@/data/profile'
import { socials } from '@/data/socials'
import { isTodo } from '@/data/types'

const SIGNATURE = 'Security · Cloud · Data · AI · Impact'

export function Footer() {
  const links = socials.filter((social) => !isTodo(social.href))

  return (
    <footer className="relative z-10 border-t border-line bg-navy-950/70 backdrop-blur-sm">
      <Container className="flex flex-col items-center gap-6 py-12 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-5">
          <span className="relative grid size-12 place-items-center rounded-xl border border-line-strong bg-navy-900 font-display text-base font-bold tracking-wider text-ink">
            {profile.initials}
            <span aria-hidden className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)]" />
          </span>
          <div>
            <p className="font-display text-lg font-medium text-ink">{profile.name}</p>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-muted">{SIGNATURE}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {links.map((social) => (
            <a
              key={social.id}
              href={social.href}
              aria-label={social.label}
              {...(social.id === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              className="grid size-10 place-items-center rounded-full border border-line-strong text-ink-muted transition-colors hover:border-cyan/60 hover:text-cyan"
            >
              <Icon name={social.icon} className="size-4" />
            </a>
          ))}
          <a
            href="#home"
            aria-label="Retour en haut de page"
            className="grid size-10 place-items-center rounded-full border border-line-strong text-ink-muted transition-colors hover:border-cyan/60 hover:text-cyan"
          >
            <ArrowUp className="size-4" aria-hidden />
          </a>
        </div>
      </Container>
      <p className="pb-8 text-center text-xs text-ink-subtle">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  )
}
