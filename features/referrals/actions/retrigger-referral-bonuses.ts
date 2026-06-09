"use server"

import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"

export async function retriggerReferralBonusesAction(
  userId: string
): Promise<unknown> {
  const { data } = await post<unknown>(
    endpoints.admin.referralsRetrigger,
    {},
    { params: { userId } }
  )
  return data
}
