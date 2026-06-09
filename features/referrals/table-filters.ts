import type { DataTableFilterField } from "@/components/data-table"
import { BONUS_PAID_FILTER_OPTIONS } from "@/features/referrals/constants"

export const referralsTableFilters: DataTableFilterField[] = [
  {
    type: "select",
    param: "bonusPaid",
    label: "Bonus status",
    placeholder: "Bonus status",
    options: BONUS_PAID_FILTER_OPTIONS.map((o) => ({ ...o })),
    emptyLabel: "All bonuses",
  },
]
