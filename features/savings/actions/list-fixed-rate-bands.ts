"use server"

import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { SavingsFixedRateBand } from "@/features/savings/types"

export async function listFixedRateBandsAction(): Promise<
  SavingsFixedRateBand[]
> {
  const { data } = await get<SavingsFixedRateBand[]>(
    endpoints.admin.savingsFixedRateBands
  )
  return data
}
