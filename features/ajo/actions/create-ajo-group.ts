"use server"

import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { AjoGroup, CreateAjoGroupPayload } from "@/features/ajo/types"

export async function createAjoGroupAction(
  payload: CreateAjoGroupPayload
): Promise<AjoGroup> {
  const { data } = await post<AjoGroup>(endpoints.admin.ajoGroups, payload)
  return data
}
