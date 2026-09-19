import { ContactActions } from '@/components/contact/ContactActions'
import { Section } from '@/components/layout/Section'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'

export function ContactSection() {
  return (
    <Section id="contact" className="pb-28">
      <div className="mx-auto max-w-3xl rounded-[1.75rem] border border-line-strong bg-linear-to-b from-electric/[0.1] to-surface px-6 py-14 text-center sm:px-12 sm:py-20">
        <SectionHeading
          id="contact"
          eyebrow="Contact"
          title="Let’s build something meaningful."
          description="Vous avez un projet, une idée ou une opportunité de collaboration ?"
          align="center"
        />
        <Reveal delay={0.24} className="mt-10">
          <ContactActions />
        </Reveal>
      </div>
    </Section>
  )
}
