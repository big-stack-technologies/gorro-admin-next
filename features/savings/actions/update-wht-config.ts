"use server"

import type {
  SavingsWhtConfig,
  UpdateWhtConfigPayload,
} from "@/features/savings/types"
import type { ActionResult } from "@/lib/actions/action-result"
import { actionFailure } from "@/lib/actions/action-result"
import { patch } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { AnalyticsApiEnvelope } from "@/lib/types/analytics-api"

export async function updateWhtConfigAction(
  payload: UpdateWhtConfigPayload
): Promise<ActionResult<SavingsWhtConfig>> {
  try {
    const { data } = await patch<AnalyticsApiEnvelope<SavingsWhtConfig>>(
      endpoints.admin.savingsWht,
      payload
    )
    return { success: true, data: data.data }
  } catch (error) {
    console.error("Update WHT config action failed:", error)
    return actionFailure(error, "Could not update WHT")
  }
}
