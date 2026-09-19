import { useMediaQuery } from './useMediaQuery'

/** Vrai si l'utilisateur a demandé de réduire les animations. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
