/** Client-safe TanStack Query keys (no server-only imports). Single source of truth. */

export const QUERY_KEYS = {
  // Authentication
  session: ["auth", "session"],

  // Users
  users: {
    all: ["users"],
    list: ["users", "list"] as const,
    detail: (id: string) => ["users", "detail", id] as const,
    analyticsSummary: ["users", "analytics", "summary"] as const,
    byTier: ["users", "analytics", "by-tier"] as const,
  },

  transactions: {
    all: ["transactions"],
    list: ["transactions", "list"] as const,
    detail: (id: string) => ["transactions", "detail", id] as const,
    analyticsSummary: ["transactions", "analytics", "summary"] as const,
    amlFlags: ["transactions", "analytics", "aml-flags"] as const,
  },

  withdrawalRequests: {
    all: ["withdrawal-requests"],
    list: ["withdrawal-requests", "list"] as const,
    detail: (id: string) => ["withdrawal-requests", "detail", id] as const,
  },

  wallet: {
    main: (userId: string) => ["wallet", "main", userId] as const,
  },

  referrals: {
    all: ["referrals"],
    list: ["referrals", "list"] as const,
    stats: ["referrals", "stats"] as const,
    detail: (userId: string) => ["referrals", "detail", userId] as const,
  },

  dashboard: {
    all: ["dashboard"] as const,
    summary: (period: string) => ["dashboard", "summary", period] as const,
    usersGrowth: ["dashboard", "users-growth"] as const,
    transactionsVolume: ["dashboard", "transactions-volume"] as const,
  },
} as const
