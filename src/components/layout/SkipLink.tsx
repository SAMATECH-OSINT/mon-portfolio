/** Lien d'évitement clavier, visible uniquement au focus. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-electric-600 focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
    >
      Aller au contenu principal
    </a>
  )
}
