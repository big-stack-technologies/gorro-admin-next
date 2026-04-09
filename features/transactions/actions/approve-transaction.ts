"use server"

import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { TransactionReasonPayload } from "@/features/transactions/schema"

export async function approveTransactionAction(
  id: string,
  payload: TransactionReasonPayload
): Promise<unknown> {
  const { data } = await post<unknown>(
    endpoints.admin.transactionApproveAmlById(id),
    payload
  )
  return data
}
