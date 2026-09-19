import { ChainExplorer } from '@/components/architecture/ChainExplorer'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { securityDataThread, techChain } from '@/data/architecture'

export function ArchitectureSection() {
  return (
    <Section id="architecture">
      <SectionHeading
        id="architecture"
        eyebrow="Architecture"
        title="Architecture & Engineering"
        description="Du réseau à la décision : la donnée traverse une chaîne technique cohérente, sécurisée à chaque étape."
      />
      <div className="mt-14">
        <ChainExplorer steps={techChain} label="Chaîne technique : du réseau à la décision" />
      </div>

      <div className="mt-20">
        <h3 className="text-center font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">
          Cybersécurité × Data × IA
        </h3>
        <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-ink-muted">
          Ces domaines ne sont pas isolés : les événements de sécurité alimentent la donnée, la donnée nourrit l’IA, l’IA éclaire la décision.
        </p>
        <div className="mt-8">
          <ChainExplorer steps={securityDataThread} label="Du réseau à l’aide à la décision : sécurité, données et IA" />
        </div>
        <p className="mt-6 text-center text-sm text-ink-subtle">
          Représentation conceptuelle de mon approche d’ingénierie, sans lien avec une infrastructure réelle.
        </p>
      </div>
    </Section>
  )
}
