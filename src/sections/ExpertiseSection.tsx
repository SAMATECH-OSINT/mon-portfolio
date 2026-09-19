import { ExpertiseCard } from '@/components/expertise/ExpertiseCard'
import { PositioningAxes } from '@/components/expertise/PositioningAxes'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { skillDomains } from '@/data/skills'

/** Rythme de la grille : Cybersecurity occupe deux colonnes ; Cloud et Big Data sont mis en avant. */
const layout: Record<string, { featured?: boolean; wide?: boolean; span: string }> = {
  security: { wide: true, span: 'md:col-span-2' },
  cloud: { featured: true, span: '' },
  bigdata: { featured: true, span: '' },
  development: { span: 'md:col-span-2 lg:col-span-1' },
}

export function ExpertiseSection() {
  return (
    <Section id="expertise">
      <SectionHeading
        id="expertise"
        eyebrow="Expertise"
        title="Des domaines complémentaires, une même chaîne de valeur"
        description="Du réseau à l’intelligence artificielle : chaque domaine renforce les autres."
      />

      <div className="mt-14">
        <PositioningAxes />
      </div>

      <h3 className="mt-16 font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">Domaines techniques</h3>
      <ul className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillDomains.map((domain, index) => {
          const config = layout[domain.id]
          return (
            <li key={domain.id} className={config?.span}>
              <Reveal delay={(index % 3) * 0.08} className="h-full">
                <ExpertiseCard domain={domain} featured={config?.featured ?? false} wide={config?.wide ?? false} />
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
