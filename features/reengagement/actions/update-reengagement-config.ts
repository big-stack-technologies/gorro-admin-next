"use server"

import { patch } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type {
  ReengagementConfig,
  UpdateReengagementConfigPayload,
} from "@/features/reengagement/types"

export async function updateReengagementConfigAction(
  payload: UpdateReengagementConfigPayload
): Promise<ReengagementConfig> {
  const { data } = await patch<ReengagementConfig>(
    endpoints.admin.reengagementConfig,
    payload
  )
  return data
}
