"use server"

import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"

export async function approveWithdrawalRequestAction(
  id: string
): Promise<unknown> {
  const { data } = await post<unknown>(
    endpoints.admin.withdrawalRequestApproveById(id)
  )
  return data
}
