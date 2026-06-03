"use server"

import { buildPaginatedListQueryParams } from "@/lib/api/build-paginated-query-params"
import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { WithdrawalRequest } from "@/features/withdrawal-requests/types"
import type {
  PaginatedListQueryParams,
  PaginatedListResponse,
} from "@/lib/types/paginated-list"

export async function listWithdrawalRequestsAction(
  params: PaginatedListQueryParams
): Promise<PaginatedListResponse<WithdrawalRequest>> {
  const { data } = await get<PaginatedListResponse<WithdrawalRequest>>(
    endpoints.admin.withdrawalRequests,
    {
      params: buildPaginatedListQueryParams(params),
    }
  )
  return data
}
