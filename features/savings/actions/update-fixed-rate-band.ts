"use server"

import { patch } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type {
  SavingsFixedRateBand,
  UpdateFixedRateBandPayload,
} from "@/features/savings/types"
import type { AnalyticsApiEnvelope } from "@/lib/types/analytics-api"

export async function updateFixedRateBandAction(
  id: string,
  payload: UpdateFixedRateBandPayload
): Promise<SavingsFixedRateBand> {
  const { data } = await patch<AnalyticsApiEnvelope<SavingsFixedRateBand>>(
    endpoints.admin.savingsFixedRateBandById(id),
    payload
  )
  return data.data
}
