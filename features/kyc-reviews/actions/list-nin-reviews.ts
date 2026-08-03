"use server"

import { buildPaginatedListQueryParams } from "@/lib/api/build-paginated-query-params"
import { get } from "@/lib/api/axios"
import { normalizeNinReviewPagination } from "@/features/kyc-reviews/actions/pagination"
import type {
  NinReview,
  NinReviewListApiResponse,
} from "@/features/kyc-reviews/types"
import { endpoints } from "@/lib/endpoints"
import type {
  PaginatedListQueryParams,
  PaginatedListResponse,
} from "@/lib/types/paginated-list"

export async function listNinReviewsAction(
  params: PaginatedListQueryParams
): Promise<PaginatedListResponse<NinReview>> {
  const { data } = await get<NinReviewListApiResponse>(
    endpoints.admin.kycNinReviews,
    {
      params: buildPaginatedListQueryParams(params),
    }
  )
  return normalizeNinReviewPagination(data)
}
