import { Pending } from '@/components/ui/Pending'
import { profile } from '@/data/profile'
import { isTodo } from '@/data/types'

/** Portrait professionnel ; cadre provisoire tant que la photo n'est pas fournie. */
export function AboutPortrait() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div
        aria-hidden
        className="absolute -inset-3 rounded-[1.75rem] bg-linear-to-br from-electric/25 via-transparent to-cyan/20 blur-2xl"
      />
      <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-line-strong bg-navy-900">
        {isTodo(profile.photo) ? (
          <div className="grid size-full place-items-center bg-[radial-gradient(circle_at_30%_20%,rgb(22_119_255/0.28),transparent_60%)]">
            <div className="flex flex-col items-center gap-4">
              <span className="font-display text-7xl font-semibold tracking-tight text-ink/90">{profile.initials}</span>
              <Pending />
              <span className="sr-only">Photo professionnelle à compléter</span>
            </div>
          </div>
        ) : (
          <img
            src={profile.photo}
            alt={`Portrait de ${profile.name}`}
            width={800}
            height={1000}
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
        )}
      </div>
    </div>
  )
}
