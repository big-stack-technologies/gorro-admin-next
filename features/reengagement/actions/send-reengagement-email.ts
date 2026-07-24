"use server"

import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { ActionResult } from "@/lib/actions/action-result"
import { actionFailure } from "@/lib/actions/action-result"
import type {
  SendReengagementEmailPayload,
  SendReengagementEmailResponse,
} from "@/features/reengagement/types"

export async function sendReengagementEmailAction(
  payload: SendReengagementEmailPayload
): Promise<ActionResult<SendReengagementEmailResponse>> {
  try {
    const { data } = await post<SendReengagementEmailResponse>(
      endpoints.admin.reengagementEmail,
      payload
    )
    return { success: true, data }
  } catch (error) {
    console.error("Send re-engagement email action failed:", error)
    return actionFailure(error, "Could not send email")
  }
}
