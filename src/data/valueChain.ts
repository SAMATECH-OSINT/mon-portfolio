export interface ChainStep {
  id: string
  label: string
}

/** Section « From Data to Impact ». */
export const impactChain: readonly ChainStep[] = [
  { id: 'data', label: 'Data' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'intelligence', label: 'Intelligence' },
  { id: 'security', label: 'Security' },
  { id: 'decision', label: 'Decision' },
  { id: 'impact', label: 'Impact' },
]

export const impactStatement = 'Des données aujourd’hui, aux décisions de demain.'
