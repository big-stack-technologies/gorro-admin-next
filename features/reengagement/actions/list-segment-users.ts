"use server"

import { buildPaginatedListQueryParams } from "@/lib/api/build-paginated-query-params"
import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import { isReengagementCampaign } from "@/features/reengagement/constants"
import { normalizeReengagementPagination } from "@/features/reengagement/actions/pagination"
import type {
  ReengagementApiPaginatedResponse,
  ReengagementCampaign,
  SegmentUser,
} from "@/features/reengagement/types"
import type {
  PaginatedListQueryParams,
  PaginatedListResponse,
} from "@/lib/types/paginated-list"

export async function listSegmentUsersAction(
  campaign: ReengagementCampaign,
  params: PaginatedListQueryParams
): Promise<PaginatedListResponse<SegmentUser>> {
  if (!isReengagementCampaign(campaign)) {
    throw new Error("Invalid re-engagement campaign")
  }

  const { data } = await get<ReengagementApiPaginatedResponse<SegmentUser>>(
    endpoints.admin.reengagementSegmentUsers(campaign),
    { params: buildPaginatedListQueryParams(params) }
  )

  return normalizeReengagementPagination(data)
}
