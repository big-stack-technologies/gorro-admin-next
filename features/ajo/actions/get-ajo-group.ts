"use server"

import type { AjoGroupDetail } from "@/features/ajo/types"
import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"

export async function getAjoGroupAction(id: string): Promise<AjoGroupDetail> {
  const { data } = await get<AjoGroupDetail>(endpoints.admin.ajoGroupById(id))
  return data
}
