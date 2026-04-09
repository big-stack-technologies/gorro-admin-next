"use server"

import { get } from "@/lib/api/axios"
import type {
  TransactionVolumePoint,
  TransactionsVolumeApiEnvelope,
} from "@/features/dashboard/types"
import { endpoints } from "@/lib/endpoints"

export async function getTransactionsVolumeAction(): Promise<
  TransactionVolumePoint[]
> {
  const { data } = await get<TransactionsVolumeApiEnvelope>(
    endpoints.admin.transactionsVolume
  )
  return data.data
}
