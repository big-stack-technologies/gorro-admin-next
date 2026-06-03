"use server"

import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { WithdrawalsReasonPayload } from "@/features/users/schema"

export async function enableUserWithdrawalsAction(
  id: string,
  payload: WithdrawalsReasonPayload
): Promise<unknown> {
  const { data } = await post<unknown>(
    endpoints.admin.userWithdrawalsEnableById(id),
    payload
  )
  return data
}
