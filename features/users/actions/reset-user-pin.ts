"use server"

import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"

export async function resetUserPinAction(id: string): Promise<unknown> {
  const { data } = await post<unknown>(
    endpoints.admin.userResetPinById(id),
    {}
  )
  return data
}
