"use server"

import { patch } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { UpdateUserPayload } from "@/features/users/schema"
import type { User } from "@/features/users/types"

export async function updateUserAction(
  id: string,
  payload: UpdateUserPayload
): Promise<User> {
  const { data } = await patch<User>(endpoints.admin.userById(id), payload)
  return data
}
