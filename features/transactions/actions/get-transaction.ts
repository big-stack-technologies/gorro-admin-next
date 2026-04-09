"use server"

import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { TransactionDetail } from "@/features/transactions/types"

export async function getTransactionAction(
  id: string
): Promise<TransactionDetail> {
  const { data } = await get<TransactionDetail>(endpoints.admin.transactionById(id))
  return data
}
