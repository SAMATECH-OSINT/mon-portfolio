import { ArrowUpRight, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { profile } from '@/data/profile'
import { socials } from '@/data/socials'
import { isTodo } from '@/data/types'
import { CvLink } from './CvLink'

/** Le contact direct est l'action principale ; les réseaux sociaux non renseignés ne sont pas affichés. */
const labels = { email: 'Me contacter', linkedin: 'LinkedIn', github: 'GitHub' } as const

export function ContactActions() {
  const available = socials.flatMap((social) => (isTodo(social.href) ? [] : [{ ...social, href: social.href }]))

  return (
    <div>
      <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {available.map((social) => (
          <Button
            key={social.id}
            href={social.href}
            variant={social.id === 'email' ? 'primary' : 'secondary'}
            size="lg"
            iconStart={<Icon name={social.icon} className="size-4" />}
            iconEnd={social.id === 'email' ? undefined : <ArrowUpRight className="size-4" aria-hidden />}
          >
            {labels[social.id]}
          </Button>
        ))}
        <CvLink />
      </div>
      {!isTodo(profile.location) && (
        <p className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-muted">
          <MapPin className="size-4 text-cyan" aria-hidden />
          {profile.location}
        </p>
      )}
    </div>
  )
}
