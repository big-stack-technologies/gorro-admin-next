"use server"

import type { AuthProfile } from "@/features/auth/types"
import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"

export async function getProfileAction(): Promise<AuthProfile> {
  const { data } = await get<AuthProfile>(endpoints.auth.me)
  return data
}
