"use server"

import type { AjoGroupDetail } from "@/features/ajo/types"
import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"

export async function closeAjoGroupAction(id: string): Promise<AjoGroupDetail> {
  const { data } = await post<AjoGroupDetail>(
    endpoints.admin.ajoGroupClose(id),
    {}
  )
  return data
}
