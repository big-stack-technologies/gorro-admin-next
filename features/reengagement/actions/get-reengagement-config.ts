"use server"

import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { ReengagementConfig } from "@/features/reengagement/types"

export async function getReengagementConfigAction(): Promise<ReengagementConfig> {
  const { data } = await get<ReengagementConfig>(
    endpoints.admin.reengagementConfig
  )
  return data
}
