import { Download } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { profile } from '@/data/profile'
import { isTodo } from '@/data/types'

interface CvLinkProps {
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'lg'
}

/** Lien de téléchargement du CV ; rien n'est rendu tant que `profile.cv` n'est pas renseigné. */
export function CvLink({ variant = 'secondary', size = 'lg' }: CvLinkProps) {
  if (isTodo(profile.cv)) return null
  return (
    <Button
      href={profile.cv}
      variant={variant}
      size={size}
      download
      iconStart={<Download className="size-4" aria-hidden />}
    >
      Télécharger mon CV
    </Button>
  )
}
