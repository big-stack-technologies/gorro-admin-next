/**
 * Shared API error shape and type guard. Safe to import from Client Components
 * (no axios / next/headers).
 */
export type ApiError = {
  message: string
  status: number | undefined
}

export function isApiError(value: unknown): value is ApiError {
  if (typeof value !== "object" || value === null) return false
  const o = value as Partial<ApiError>
  if (typeof o.message !== "string") return false
  if (o.status !== undefined && typeof o.status !== "number") return false
  return true
}
