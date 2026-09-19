import { ArrowUpRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { socials } from '@/data/socials'
import { isTodo } from '@/data/types'

/** Ordre et libellés des actions : le contact direct est l'action principale. */
const actions = [
  { id: 'email', label: 'Me contacter', variant: 'primary' },
  { id: 'linkedin', label: 'LinkedIn', variant: 'secondary' },
  { id: 'github', label: 'GitHub', variant: 'secondary' },
] as const

const NOTE_ID = 'contact-pending-note'

/**
 * Boutons de contact. Tant qu'une coordonnée vaut `TODO`, le bouton est désactivé
 * (aucun lien factice) et la section explique pourquoi.
 */
export function ContactActions() {
  const missing = actions.some((action) => isTodo(socials.find((s) => s.id === action.id)?.href))

  return (
    <div>
      <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
        {actions.map((action) => {
          const social = socials.find((s) => s.id === action.id)
          if (!social) return null
          const icon = <Icon name={social.icon} className="size-4" />
          return isTodo(social.href) ? (
            <Button key={action.id} variant={action.variant} size="lg" disabled aria-describedby={NOTE_ID} iconStart={icon}>
              {action.label}
            </Button>
          ) : (
            <Button
              key={action.id}
              href={social.href}
              variant={action.variant}
              size="lg"
              iconStart={icon}
              iconEnd={action.id === 'email' ? undefined : <ArrowUpRight className="size-4" aria-hidden />}
            >
              {action.label}
            </Button>
          )
        })}
      </div>
      {missing && (
        <p id={NOTE_ID} className="mt-5 text-center font-mono text-xs text-ink-subtle">
          Coordonnées : À compléter
        </p>
      )}
    </div>
  )
}
