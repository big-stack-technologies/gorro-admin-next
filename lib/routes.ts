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
  protected: {
    admin: {
      base: "/admin",
    },
    users: {
      base: "/admin/users",
    },
    transactions: {
      base: "/admin/transactions",
      detail: (id: string) =>
        `/admin/transactions/${encodeURIComponent(id)}`,
    },
  },
} as const

export type Routes = typeof routes
