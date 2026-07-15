"use server"

import { buildPaginatedListQueryParams } from "@/lib/api/build-paginated-query-params"
import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type {
  ClusterApiPaginatedResponse,
  ClusterListItem,
} from "@/features/clusters/types"
import type {
  PaginatedListQueryParams,
  PaginatedListResponse,
} from "@/lib/types/paginated-list"

import { normalizeClusterPagination } from "./pagination"

export async function listClustersAction(
  params: PaginatedListQueryParams
): Promise<PaginatedListResponse<ClusterListItem>> {
  const { data } = await get<ClusterApiPaginatedResponse<ClusterListItem>>(
    endpoints.admin.clusters,
    { params: buildPaginatedListQueryParams(params) }
  )

  return normalizeClusterPagination(data)
}
