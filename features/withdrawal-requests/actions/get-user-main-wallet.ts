"use server"

import { get } from "@/lib/api/axios"
import type { UserMainWallet } from "@/features/withdrawal-requests/types"
import { endpoints } from "@/lib/endpoints"

export async function getUserMainWalletAction(
  userId: string
): Promise<UserMainWallet> {
  const { data } = await get<UserMainWallet>(
    endpoints.wallet.mainByUserId(userId)
  )
  return data
}
