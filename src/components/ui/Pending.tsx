import { PENDING_LABEL } from '@/lib/display'
import { Badge } from './Badge'

/** Marque visuelle d'une donnée à compléter par Mamadou Sarr. */
export function Pending({ className }: { className?: string }) {
  return (
    <Badge variant="pending" {...(className ? { className } : {})}>
      {PENDING_LABEL}
    </Badge>
  )
}
