"use server"

import type { AuthProfile } from "@/features/auth/types"
import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"

export async function getProfileAction(): Promise<AuthProfile> {
  try {
    const { data } = await get<AuthProfile>(endpoints.auth.me)
    return data
  } catch (error) {
    console.error(error)
    throw error
  }
}
