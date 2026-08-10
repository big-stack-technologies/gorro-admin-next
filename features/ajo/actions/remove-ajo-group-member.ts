"use server"

import type { AjoGroupDetail } from "@/features/ajo/types"
import type { ActionResult } from "@/lib/actions/action-result"
import { actionFailure } from "@/lib/actions/action-result"
import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"

export async function removeAjoGroupMemberAction(
  groupId: string,
  memberId: string
): Promise<ActionResult<AjoGroupDetail>> {
  try {
    const { data } = await post<AjoGroupDetail>(
      endpoints.admin.ajoGroupMemberRemove(groupId, memberId),
      {}
    )
    return { success: true, data }
  } catch (error) {
    console.error(
      `Remove Ajo group member action failed for group ${groupId}, member ${memberId}:`,
      error
    )
    return actionFailure(error, "Could not remove member")
  }
}
