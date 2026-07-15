"use server"

import type {
  ClusterApiPaginatedResponse,
  ClusterWithdrawal,
} from "@/features/clusters/types"
import { buildPaginatedListQueryParams } from "@/lib/api/build-paginated-query-params"
import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type {
  PaginatedListQueryParams,
  PaginatedListResponse,
} from "@/lib/types/paginated-list"

import { normalizeClusterPagination } from "./pagination"

export async function listAllClusterWithdrawalsAction(
  params: PaginatedListQueryParams
): Promise<PaginatedListResponse<ClusterWithdrawal>> {
  const { data } = await get<ClusterApiPaginatedResponse<ClusterWithdrawal>>(
    endpoints.admin.clusterWithdrawals,
    { params: buildPaginatedListQueryParams(params) }
  )
  return normalizeClusterPagination(data)
}

export async function listClusterWithdrawalsAction(
  clusterId: string,
  params: PaginatedListQueryParams
): Promise<PaginatedListResponse<ClusterWithdrawal>> {
  const { data } = await get<ClusterApiPaginatedResponse<ClusterWithdrawal>>(
    endpoints.admin.clusterWithdrawalsById(clusterId),
    { params: buildPaginatedListQueryParams(params) }
  )
  return normalizeClusterPagination(data)
}
