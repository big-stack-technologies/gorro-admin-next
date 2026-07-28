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
  emailVerified: boolean
  phoneNumberVerified: boolean
  nin: string | null
  bvn: string | null
  withdrawalsDisabled: boolean
  withdrawalsDisabledAt: string | null
  withdrawalsDisabledReason: string | null
  withdrawalsEnabledAt: string | null
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

export type VerifyUserBvnPayload = {
  bvn: string
}

export type BvnResolutionDetails = {
  bvn: string
  firstName: string
  lastName: string
  middleName: string
  gender: string
  dateOfBirth: string
  phoneNo: string
  pixBase64?: string
}

export type VerifyUserBvnData = {
  verificationStatus: string
  response: BvnResolutionDetails
}

export type VerifyUserBvnResponse = {
  success: boolean
  data: VerifyUserBvnData
  message: string
}
