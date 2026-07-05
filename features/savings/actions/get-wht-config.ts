"use server"

import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { SavingsWhtConfig } from "@/features/savings/types"

export async function getWhtConfigAction(): Promise<SavingsWhtConfig> {
  const { data } = await get<SavingsWhtConfig>(endpoints.admin.savingsWht)
  return data
}
