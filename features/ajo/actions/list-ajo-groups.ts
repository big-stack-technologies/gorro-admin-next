"use server"

import { buildPaginatedListQueryParams } from "@/lib/api/build-paginated-query-params"
import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type {
  AjoGroupListItem,
  AjoGroupsApiResponse,
} from "@/features/ajo/types"
import type {
  PaginatedListQueryParams,
  PaginatedListResponse,
} from "@/lib/types/paginated-list"

import { normalizeAjoPagination } from "./pagination"

export async function listAjoGroupsAction(
  params: PaginatedListQueryParams
): Promise<PaginatedListResponse<AjoGroupListItem>> {
  const { data } = await get<AjoGroupsApiResponse>(
    endpoints.admin.ajoGroups,
    { params: buildPaginatedListQueryParams(params) }
  )

  return normalizeAjoPagination(data)
}
