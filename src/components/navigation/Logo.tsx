import { profile } from '@/data/profile'

interface LogoProps {
  onNavigate?: () => void
}

export function Logo({ onNavigate }: LogoProps) {
  return (
    <a
      href="#home"
      onClick={onNavigate}
      aria-label={`${profile.name} — retour à l’accueil`}
      className="group flex items-center gap-3"
    >
      <span className="relative grid size-10 place-items-center rounded-xl border border-line-strong bg-navy-900 font-display text-sm font-bold tracking-wider text-ink transition-colors duration-300 group-hover:border-cyan/60">
        {profile.initials}
        <span aria-hidden className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-cyan shadow-[0_0_10px_var(--color-cyan)]" />
      </span>
      <span className="hidden font-display text-[0.9375rem] font-medium tracking-tight text-ink sm:block">
        {profile.name}
      </span>
    </a>
  )
}
