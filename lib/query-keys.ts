/** Client-safe TanStack Query keys (no server-only imports). Single source of truth. */

export const QUERY_KEYS = {
  // Authentication
  session: ["auth", "session"],
} as const
