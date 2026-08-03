import {
  NIN_REVIEW_PENDING_STATUS,
  NIN_REVIEW_STATUS_FILTER_OPTIONS,
} from "@/features/kyc-reviews/constants"
import type { DataTableFilterField } from "@/components/data-table/data-table-filters"

export const ninReviewsTableFilters: DataTableFilterField[] = [
  {
    type: "select",
    param: "status",
    label: "Status",
    placeholder: "Status",
    options: NIN_REVIEW_STATUS_FILTER_OPTIONS.map((o) => ({ ...o })),
    clearable: false,
  },
]

export const ninReviewsDefaultFilters = {
  status: NIN_REVIEW_PENDING_STATUS,
} as const
