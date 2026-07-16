"use server"

import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { RunReengagementResponse } from "@/features/reengagement/types"

export async function runReengagementCampaignsAction(): Promise<RunReengagementResponse> {
  const { data } = await post<RunReengagementResponse>(
    endpoints.admin.reengagementRun
  )
  return data
}
