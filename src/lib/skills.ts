import type { SkillDomain } from '@/data/skills'

const itemsOf = (domain: SkillDomain): ReadonlySet<string> => new Set([...domain.technologies, ...domain.focus])

/** Autres domaines qui partagent un même élément (technologie ou périmètre). */
export function domainsSharing(domains: readonly SkillDomain[], domainId: string, item: string): SkillDomain[] {
  return domains.filter((other) => other.id !== domainId && itemsOf(other).has(item))
}

/** Identifiants des domaines ayant au moins un élément en commun avec `domainId`. */
export function relatedDomainIds(domains: readonly SkillDomain[], domainId: string): ReadonlySet<string> {
  const selected = domains.find((domain) => domain.id === domainId)
  if (!selected) return new Set()
  const own = itemsOf(selected)
  return new Set(
    domains
      .filter((other) => other.id !== domainId && [...itemsOf(other)].some((item) => own.has(item)))
      .map((other) => other.id),
  )
}
