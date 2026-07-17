"use server"

import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { ActionResult } from "@/lib/actions/action-result"
import { actionFailure } from "@/lib/actions/action-result"
import type { AjoGroup, CreateAjoGroupPayload } from "@/features/ajo/types"

export async function createAjoGroupAction(
  payload: CreateAjoGroupPayload
): Promise<ActionResult<AjoGroup>> {
  try {
    const { data } = await post<AjoGroup>(endpoints.admin.ajoGroups, payload)
    return { success: true, data }
  } catch (error) {
    console.error("Create Ajo group action failed:", error)
    return actionFailure(error, "Could not create Ajo group")
  }
}
