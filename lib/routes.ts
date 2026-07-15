/**
 * App route paths (pathname segments). Use for links, redirects, and proxy checks.
 * API paths live in {@link import("./endpoints")}.
 */
export const routes = {
  /** Default destination after login */
  home: "/",
  public: {
    login: "/login",
  },
  /** Clears session cookies in the browser, then redirects to login. */
  api: {
    sessionClear: "/api/auth/logout",
  },
  protected: {
    admin: {
      base: "/admin",
    },
    users: {
      base: "/admin/users",
    },
    transactions: {
      base: "/admin/transactions",
      detail: (id: string) => `/admin/transactions/${encodeURIComponent(id)}`,
    },
    withdrawalRequests: {
      base: "/admin/withdrawal-requests",
      detail: (id: string) =>
        `/admin/withdrawal-requests/${encodeURIComponent(id)}`,
    },
    referrals: {
      base: "/admin/referrals",
      detail: (userId: string) =>
        `/admin/referrals/${encodeURIComponent(userId)}`,
    },
    savings: {
      base: "/admin/savings",
    },
    featureFlags: {
      base: "/admin/feature-flags",
    },
    ajo: {
      base: "/admin/ajo",
    },
    clusters: {
      base: "/admin/clusters",
      detail: (id: string) => `/admin/clusters/${encodeURIComponent(id)}`,
      withdrawals: "/admin/clusters/withdrawals",
    },
  },
} as const

export type Routes = typeof routes
