"use server"

import type { AjoGroupDetail } from "@/features/ajo/types"
import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"

export async function removeAjoGroupMemberAction(
  groupId: string,
  memberId: string
): Promise<AjoGroupDetail> {
  try {
    const { data } = await post<AjoGroupDetail>(
      endpoints.admin.ajoGroupMemberRemove(groupId, memberId),
      {}
    )
    return data
  } catch (error) {
    console.error(
      `Remove Ajo group member action failed for group ${groupId}, member ${memberId}:`,
      error
    )
    throw error
  }
}
