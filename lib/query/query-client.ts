import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query"

import { ApiRequestError, getApiErrorMessage, isApiError } from "@/lib/api/api-error"
import { routes } from "@/lib/routes"

/** Next.js replaces server-action 401 failures with this opaque client error. */
const SERVER_ACTION_UNEXPECTED_RESPONSE =
  "An unexpected response was received from the server."

function isServerActionSessionFailure(error: unknown): boolean {
  if (typeof window === "undefined") return false
  if (getApiErrorMessage(error) !== SERVER_ACTION_UNEXPECTED_RESPONSE) return false
  return window.location.pathname.startsWith(routes.protected.admin.base)
}

function isUnauthorizedError(error: unknown): boolean {
  if (error instanceof ApiRequestError && error.status === 401) return true
  if (isApiError(error) && error.status === 401) return true
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof (error as { status: unknown }).status === "number" &&
    (error as { status: number }).status === 401
  ) {
    return true
  }
  if (isServerActionSessionFailure(error)) return true
  return false
}

/**
 * Server Actions invoked from the client run axios on the server; `redirect()` there
 * does not reliably update the client router. After the API clears cookies and
 * rejects with 401, perform a full navigation from the browser.
 */
function redirectToLoginIfUnauthorized(error: unknown) {
  if (typeof window === "undefined") return
  if (!isUnauthorizedError(error)) return
  window.location.assign(routes.api.sessionClear)
}

function shouldRetry(failureCount: number, error: unknown): boolean {
  if (isUnauthorizedError(error)) return false
  return failureCount < 1
}

/**
 * Default query options for TanStack Query
 */
const queryConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: shouldRetry,
      refetchOnWindowFocus: process.env.NODE_ENV === "development",
      refetchOnReconnect: true,
    },
    mutations: {
      retry: false,
    },
  },
}

/**
 * Create a new QueryClient instance with default configuration
 * This should be used for client-side rendering
 */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    ...queryConfig,
    queryCache: new QueryCache({
      onError: redirectToLoginIfUnauthorized,
    }),
    mutationCache: new MutationCache({
      onError: redirectToLoginIfUnauthorized,
    }),
  })
}
