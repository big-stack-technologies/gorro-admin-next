"use server"

import type { WithdrawalsReasonPayload } from "@/features/users/schema"
import type { ActionResult } from "@/lib/actions/action-result"
import { actionFailure } from "@/lib/actions/action-result"
import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"

export async function enableUserWithdrawalsAction(
  id: string,
  payload: WithdrawalsReasonPayload
): Promise<ActionResult<unknown>> {
  try {
    const { data } = await post<unknown>(
      endpoints.admin.userWithdrawalsEnableById(id),
      payload
    )
    return { success: true, data }
  } catch (error) {
    console.error(`Enable user withdrawals action failed for ${id}:`, error)
    return actionFailure(error, "Could not enable withdrawals")
  }
}
