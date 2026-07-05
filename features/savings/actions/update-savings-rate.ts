"use server"

import { patch } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type {
  SavingsProductType,
  SavingsRateConfig,
  UpdateSavingsRatePayload,
} from "@/features/savings/types"
import type { AnalyticsApiEnvelope } from "@/lib/types/analytics-api"

export async function updateSavingsRateAction(
  productType: SavingsProductType,
  payload: UpdateSavingsRatePayload
): Promise<SavingsRateConfig> {
  const { data } = await patch<AnalyticsApiEnvelope<SavingsRateConfig>>(
    endpoints.admin.savingsRateByProduct(productType),
    payload
  )
  return data.data
}
