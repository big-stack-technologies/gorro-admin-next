"use server"

import type { ActionResult } from "@/lib/actions/action-result"
import { actionFailure } from "@/lib/actions/action-result"
import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"

export async function retriggerReferralBonusesAction(
  userId: string
): Promise<ActionResult<unknown>> {
  try {
    const { data } = await post<unknown>(
      endpoints.admin.referralsRetrigger,
      {},
      { params: { userId } }
    )
    return { success: true, data }
  } catch (error) {
    console.error(
      `Retrigger referral bonuses action failed for ${userId}:`,
      error
    )
    return actionFailure(error, "Could not retrigger referral bonuses")
  }
}
