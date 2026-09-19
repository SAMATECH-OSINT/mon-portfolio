import { ArrowRight, Mail } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { HeroIndicators } from '@/components/hero/HeroIndicators'
import { HeroVisual } from '@/components/hero/HeroVisual'
import { Button } from '@/components/ui/Button'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { Reveal } from '@/components/ui/Reveal'
import { profile } from '@/data/profile'
import { isTodo } from '@/data/types'

export function HeroSection() {
  const [lineOne, lineTwo] = profile.heroLines

  return (
    <section
      id="home"
      aria-labelledby="home-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden pb-16 pt-20 sm:pt-24 lg:pt-28 lg:pb-20"
    >
      <Container className="grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
        {/* Mobile : le globe passe en premier, compact ; le texte reste visible sans défiler. */}
        <div className="order-1 lg:order-2 lg:col-span-5">
          <Reveal y={0} className="mx-auto">
            <HeroVisual className="mx-auto w-[min(52vw,208px)] sm:w-[300px] lg:w-full lg:max-w-[580px]" />
          </Reveal>
        </div>

        <div className="order-2 lg:order-1 lg:col-span-7">
          <Reveal fade={false} y={12}>
            <p className="eyebrow flex items-center gap-3">
              {isTodo(profile.photo) ? (
                <span aria-hidden className="relative flex size-2">
                  <span className="absolute inline-flex size-full rounded-full bg-cyan opacity-60 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-cyan" />
                </span>
              ) : (
                <span aria-hidden className="relative size-11 shrink-0">
                  <span className="block size-full overflow-hidden rounded-full border border-cyan/50 shadow-[0_0_20px_-4px_rgb(0_217_255/0.55)]">
                    <ResponsiveImage
                      name={profile.photo}
                      alt=""
                      sizes="44px"
                      priority
                      className="size-full origin-[42%_14%] scale-[2.1] object-cover object-[42%_14%]"
                    />
                  </span>
                  <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-navy-950 bg-cyan" />
                </span>
              )}
              {profile.headlines.primary}
            </p>
          </Reveal>

          <Reveal fade={false} y={16} delay={0.06}>
            <h1
              id="home-title"
              className="mt-4 font-display text-display lg:mt-5 font-semibold uppercase text-ink"
            >
              <span className="block">{profile.firstName}</span>{' '}
              <span className="gradient-text block">{profile.lastName}</span>
            </h1>
          </Reveal>

          <Reveal fade={false} y={16} delay={0.12}>
            <p className="mt-5 font-display text-[clamp(1.05rem,0.9rem+1.15vw,1.65rem)] leading-snug tracking-tight">
              <span className="block text-ink">{lineOne}</span>
              <span className="block text-ink-muted">{lineTwo}</span>
            </p>
            <p className="mt-5 flex items-center gap-3">
              <span aria-hidden className="h-px w-10 bg-gold/70" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
                {profile.heroTransformation}
              </span>
            </p>
          </Reveal>

          <Reveal fade={false} y={16} delay={0.18}>
            <p className="mt-5 max-w-xl text-lead text-ink-muted">{profile.heroDescription}</p>
          </Reveal>

          <Reveal delay={0.32}>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
              <Button
                href="#projects"
                size="lg"
                className="w-full sm:w-auto"
                iconEnd={<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
              >
                Découvrir mes projets
              </Button>
              <Button
                href="#contact"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                iconStart={<Mail className="size-4" aria-hidden />}
              >
                Me contacter
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.4} className="mt-10">
            <HeroIndicators />
          </Reveal>
        </div>
      </Container>

      <a
        href="#about"
        aria-label="Défiler vers la section À propos"
        className="absolute inset-x-0 bottom-6 mx-auto hidden w-fit flex-col items-center gap-2 text-ink-subtle transition-colors hover:text-cyan lg:flex"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <span aria-hidden className="relative h-10 w-px overflow-hidden bg-line-strong">
          <span className="absolute inset-x-0 top-0 h-4 bg-cyan motion-safe:animate-[scroll-cue_2s_var(--ease-out-expo)_infinite]" />
        </span>
      </a>
    </section>
  )
}
