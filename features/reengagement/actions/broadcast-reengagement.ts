"use server"

import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { ActionResult } from "@/lib/actions/action-result"
import { actionFailure } from "@/lib/actions/action-result"
import type {
  BroadcastReengagementPayload,
  BroadcastReengagementResponse,
} from "@/features/reengagement/types"

export async function broadcastReengagementAction(
  payload: BroadcastReengagementPayload
): Promise<ActionResult<BroadcastReengagementResponse>> {
  try {
    const { data } = await post<BroadcastReengagementResponse>(
      endpoints.admin.reengagementBroadcast,
      payload
    )
    return { success: true, data }
  } catch (error) {
    console.error("Broadcast re-engagement action failed:", error)
    return actionFailure(error, "Could not send push broadcast")
  }
}
