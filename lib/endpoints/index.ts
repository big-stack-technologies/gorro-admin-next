export const endpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  admin: {
    users: "/admin/users",
    userById: (id: string) => `/admin/users/${encodeURIComponent(id)}`,
    userRoleById: (id: string) =>
      `/admin/users/${encodeURIComponent(id)}/role`,
    userFreezeById: (id: string) =>
      `/admin/users/${encodeURIComponent(id)}/freeze`,
    userResetPinById: (id: string) =>
      `/admin/users/${encodeURIComponent(id)}/reset-pin`,
    transactions: "/admin/transactions",
    transactionById: (id: string) =>
      `/admin/transactions/${encodeURIComponent(id)}`,
    transactionReverseById: (id: string) =>
      `/admin/transactions/${encodeURIComponent(id)}/reverse`,
    transactionApproveAmlById: (id: string) =>
      `/admin/transactions/${encodeURIComponent(id)}/approve-aml`,
    transactionRejectById: (id: string) =>
      `/admin/transactions/${encodeURIComponent(id)}/reject`,
    analyticsDashboard: "/admin/analytics/dashboard",
    usersGrowth: "/admin/analytics/users/growth",
    usersAnalyticsSummary: "/admin/analytics/users/summary",
    usersByTier: "/admin/analytics/users/by-tier",
    transactionsAnalyticsSummary: "/admin/analytics/transactions/summary",
    transactionsVolume: "/admin/analytics/transactions/volume",
    amlFlags: "/admin/analytics/aml-flags",
  },
} as const
