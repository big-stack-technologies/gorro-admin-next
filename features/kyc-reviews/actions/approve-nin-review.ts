"use server"

import { post } from "@/lib/api/axios"
import type { ActionResult } from "@/lib/actions/action-result"
import { actionFailure } from "@/lib/actions/action-result"
import type { NinReviewDecisionResponse } from "@/features/kyc-reviews/types"
import { endpoints } from "@/lib/endpoints"

export async function approveNinReviewAction(
  id: string
): Promise<ActionResult<NinReviewDecisionResponse>> {
  try {
    const { data } = await post<NinReviewDecisionResponse>(
      endpoints.admin.kycNinReviewApproveById(id),
      {}
    )
    return { success: true, data }
  } catch (error) {
    console.error(`Approve NIN review action failed for ${id}:`, error)
    return actionFailure(error, "Could not approve NIN review")
  }
}
