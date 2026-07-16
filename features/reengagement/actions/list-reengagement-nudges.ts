"use server"

import { buildPaginatedListQueryParams } from "@/lib/api/build-paginated-query-params"
import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import { normalizeReengagementPagination } from "@/features/reengagement/actions/pagination"
import type {
  ReengagementApiPaginatedResponse,
  ReengagementNudge,
} from "@/features/reengagement/types"
import type {
  PaginatedListQueryParams,
  PaginatedListResponse,
} from "@/lib/types/paginated-list"

export async function listReengagementNudgesAction(
  params: PaginatedListQueryParams
): Promise<PaginatedListResponse<ReengagementNudge>> {
  const { data } = await get<ReengagementApiPaginatedResponse<ReengagementNudge>>(
    endpoints.admin.reengagementNudges,
    { params: buildPaginatedListQueryParams(params) }
  )

  return normalizeReengagementPagination(data)
}
