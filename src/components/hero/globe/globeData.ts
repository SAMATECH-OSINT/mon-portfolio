import type { LatLon } from '@/lib/geo'

/**
 * Nœuds de données décoratifs du globe. Les coordonnées sont des repères
 * géographiques génériques (grandes villes) : elles ne désignent aucune
 * infrastructure réelle.
 */
export const DAKAR: LatLon = [14.69, -17.44]

const AFRICA_NODES: readonly LatLon[] = [
  [6.52, 3.38],
  [-1.29, 36.82],
  [30.04, 31.24],
  [-26.2, 28.04],
  [5.6, -0.19],
  [33.57, -7.59],
  [9.03, 38.75],
]

const WORLD_NODES: readonly LatLon[] = [
  [48.85, 2.35],
  [40.71, -74.0],
  [25.2, 55.27],
  [1.35, 103.82],
  [-23.55, -46.63],
]

export const GLOBE_NODES: readonly LatLon[] = [DAKAR, ...AFRICA_NODES, ...WORLD_NODES]

/** Liaisons : depuis Dakar vers l'Afrique, puis vers le monde, et quelques liens régionaux. */
export const GLOBE_ARCS: ReadonlyArray<readonly [LatLon, LatLon]> = [
  [DAKAR, AFRICA_NODES[0]!],
  [DAKAR, AFRICA_NODES[5]!],
  [DAKAR, WORLD_NODES[0]!],
  [DAKAR, WORLD_NODES[1]!],
  [DAKAR, AFRICA_NODES[2]!],
  [AFRICA_NODES[0]!, AFRICA_NODES[1]!],
  [AFRICA_NODES[2]!, WORLD_NODES[2]!],
  [AFRICA_NODES[3]!, AFRICA_NODES[1]!],
  [DAKAR, WORLD_NODES[4]!],
  [AFRICA_NODES[1]!, WORLD_NODES[3]!],
]

/** Orientation de repos : centre du regard entre l'Afrique de l'Ouest et l'Afrique centrale. */
export const VIEW_CENTER: LatLon = [10, 4]
