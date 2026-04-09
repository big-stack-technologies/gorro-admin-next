import type { AnalyticsApiEnvelope } from "@/lib/types/analytics-api"

export type User = {
  id: string
  email: string
  phoneNumber: string
  firstName: string | null
  lastName: string | null
  middleName: string | null
  gender: string
  role: string
  nin: string | null
  bvn: string | null
  createdAt: string
  updatedAt: string
}

/** Full user record from `GET /admin/users/{id}`. */
export type UserDetails = User & {
  accountCount: number
  totalBalance: number
}

/** Snapshot from `GET /admin/analytics/users/summary`. */
export type UsersAnalyticsSummary = {
  totalUsers: number
  activeUsers: number
  verifiedUsers: number
  unverifiedUsers: number
  newUsersThisMonth: number
}

/** One tier row from `GET /admin/analytics/users/by-tier`. */
export type UserKycTierBreakdown = {
  tier: string
  count: number
  percentage: number
}

export type UsersByTierApiEnvelope = AnalyticsApiEnvelope<UserKycTierBreakdown[]>
