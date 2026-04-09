"use server"

import { redirect, unstable_rethrow } from "next/navigation"

import { isApiError, post } from "@/lib/api/axios"
import { removeAuthTokens } from "@/lib/cookies"
import { endpoints } from "@/lib/endpoints"
import { routes } from "@/lib/routes"
import type { LogoutResponse } from "@/features/auth/types"

export async function logoutAction() {
  try {
    await post<LogoutResponse>(endpoints.auth.logout, {})
    await removeAuthTokens()
    redirect(routes.public.login)
  } catch (e) {
    unstable_rethrow(e)
    if (!isApiError(e)) {
      console.error(e)
    }
  }
}
