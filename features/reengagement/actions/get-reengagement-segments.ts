"use server"

import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { ReengagementSegmentsResponse } from "@/features/reengagement/types"

export async function getReengagementSegmentsAction(): Promise<ReengagementSegmentsResponse> {
  const { data } = await get<ReengagementSegmentsResponse>(
    endpoints.admin.reengagementSegments
  )
  return data
}
