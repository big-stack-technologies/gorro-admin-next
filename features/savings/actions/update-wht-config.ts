"use server"

import { patch } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type {
  SavingsWhtConfig,
  UpdateWhtConfigPayload,
} from "@/features/savings/types"
import type { AnalyticsApiEnvelope } from "@/lib/types/analytics-api"

export async function updateWhtConfigAction(
  payload: UpdateWhtConfigPayload
): Promise<SavingsWhtConfig> {
  const { data } = await patch<AnalyticsApiEnvelope<SavingsWhtConfig>>(
    endpoints.admin.savingsWht,
    payload
  )
  return data.data
}
