"use server"

import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { ChangeUserRolePayload } from "@/features/users/schema"
import type { User } from "@/features/users/types"

export async function changeUserRoleAction(
  id: string,
  payload: ChangeUserRolePayload
): Promise<User> {
  const { data } = await post<User>(
    endpoints.admin.userRoleById(id),
    payload
  )
  return data
}
