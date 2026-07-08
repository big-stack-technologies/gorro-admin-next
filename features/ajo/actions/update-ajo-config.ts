"use server"

import { patch } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { AjoConfig, UpdateAjoConfigPayload } from "@/features/ajo/types"

export async function updateAjoConfigAction(
  payload: UpdateAjoConfigPayload
): Promise<AjoConfig> {
  const { data } = await patch<AjoConfig>(endpoints.admin.ajoConfig, payload)
  return data
}
