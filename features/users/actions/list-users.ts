"use server"

import { buildPaginatedListQueryParams } from "@/lib/api/build-paginated-query-params"
import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type {
  PaginatedListQueryParams,
  PaginatedListResponse,
} from "@/lib/types/paginated-list"
import type { User } from "@/features/users/types"

export async function listUsersAction(
  params: PaginatedListQueryParams
): Promise<PaginatedListResponse<User>> {
  const { data } = await get<PaginatedListResponse<User>>(
    endpoints.admin.users,
    {
      params: buildPaginatedListQueryParams(params),
    }
  )
  return data
}
