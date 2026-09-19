type ClassValue = string | false | null | undefined

/** Assemble des classes CSS conditionnelles. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ')
}
