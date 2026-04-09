"use server"

import { buildPaginatedListQueryParams } from "@/lib/api/build-paginated-query-params"
import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { Transaction } from "@/features/transactions/types"
import type {
  PaginatedListQueryParams,
  PaginatedListResponse,
} from "@/lib/types/paginated-list"

export async function listTransactionsAction(
  params: PaginatedListQueryParams
): Promise<PaginatedListResponse<Transaction>> {
  const { data } = await get<PaginatedListResponse<Transaction>>(
    endpoints.admin.transactions,
    {
      params: buildPaginatedListQueryParams(params),
    }
  )
  return data
}
