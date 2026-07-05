"use server"

import { buildPaginatedListQueryParams } from "@/lib/api/build-paginated-query-params"
import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type {
  SavingsAccount,
  SavingsAccountsApiResponse,
} from "@/features/savings/types"
import type {
  PaginatedListQueryParams,
  PaginatedListResponse,
} from "@/lib/types/paginated-list"

function normalizeSavingsAccountsResponse(
  response: SavingsAccountsApiResponse
): PaginatedListResponse<SavingsAccount> {
  const { page, limit, total, data } = response
  const totalPages = limit > 0 ? Math.ceil(total / limit) : 0
  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  }
}

export async function listSavingsAccountsAction(
  params: PaginatedListQueryParams
): Promise<PaginatedListResponse<SavingsAccount>> {
  const { data } = await get<SavingsAccountsApiResponse>(
    endpoints.admin.savingsMetricsAccounts,
    {
      params: buildPaginatedListQueryParams(params),
    }
  )
  return normalizeSavingsAccountsResponse(data)
}
