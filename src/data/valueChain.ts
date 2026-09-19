export interface ChainStep {
  id: string
  label: string
}

/**
 * Chaîne de valeur technique — fil rouge du portfolio :
 * NETWORK → CLOUD → DATA INGESTION → ETL → BIG DATA → ANALYTICS → AI → SECURITY → DECISION
 */
export const techChain: readonly ChainStep[] = [
  { id: 'network', label: 'Network' },
  { id: 'cloud', label: 'Cloud' },
  { id: 'ingestion', label: 'Data Ingestion' },
  { id: 'etl', label: 'ETL' },
  { id: 'bigdata', label: 'Big Data' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'ai', label: 'AI' },
  { id: 'security', label: 'Security' },
  { id: 'decision', label: 'Decision' },
]

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
