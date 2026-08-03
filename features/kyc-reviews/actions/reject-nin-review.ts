"use server"

import { post } from "@/lib/api/axios"
import type { ActionResult } from "@/lib/actions/action-result"
import { actionFailure } from "@/lib/actions/action-result"
import type {
  NinReviewDecisionResponse,
  RejectNinReviewPayload,
} from "@/features/kyc-reviews/types"
import { endpoints } from "@/lib/endpoints"

export async function rejectNinReviewAction(
  id: string,
  payload: RejectNinReviewPayload
): Promise<ActionResult<NinReviewDecisionResponse>> {
  try {
    const { data } = await post<NinReviewDecisionResponse>(
      endpoints.admin.kycNinReviewRejectById(id),
      payload
    )
    return { success: true, data }
  } catch (error) {
    console.error(`Reject NIN review action failed for ${id}:`, error)
    return actionFailure(error, "Could not reject NIN review")
  }
}
