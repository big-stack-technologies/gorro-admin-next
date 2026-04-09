"use server"

import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { FreezeUserPayload } from "@/features/users/schema"

export async function freezeUserAction(
  id: string,
  payload: FreezeUserPayload
): Promise<unknown> {
  const { data } = await post<unknown>(
    endpoints.admin.userFreezeById(id),
    payload
  )
  return data
}
