"use server"

import { get } from "@/lib/api/axios"
import type { ReferralStats } from "@/features/referrals/types"
import { endpoints } from "@/lib/endpoints"
import type { AnalyticsApiEnvelope } from "@/lib/types/analytics-api"

export async function getReferralStatsAction(): Promise<ReferralStats> {
  const { data } = await get<AnalyticsApiEnvelope<ReferralStats>>(
    endpoints.admin.referralsStats
  )
  return data.data
}
