"use server"

import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { WithdrawalsReasonPayload } from "@/features/users/schema"

export async function disableUserWithdrawalsAction(
  id: string,
  payload: WithdrawalsReasonPayload
): Promise<unknown> {
  const { data } = await post<unknown>(
    endpoints.admin.userWithdrawalsDisableById(id),
    payload
  )
  return data
}
