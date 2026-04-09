"use server"

import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { UserDetails } from "@/features/users/types"

export async function getUserAction(id: string): Promise<UserDetails> {
  const { data } = await get<UserDetails>(endpoints.admin.userById(id))
  return data
}
