"use server"

import { redirect, unstable_rethrow } from "next/navigation"

import { isApiError, post } from "@/lib/api/axios"
import { setAuthTokens } from "@/lib/cookies"
import { endpoints } from "@/lib/endpoints"
import { routes } from "@/lib/routes"
import { loginFormSchema } from "@/features/auth/schema"
import type { LoginActionState, LoginResponse } from "@/features/auth/types"

export async function loginAction(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const raw = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  }

  const parsed = loginFormSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: NonNullable<LoginActionState["fieldErrors"]> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]
      if (key === "email") fieldErrors.email = issue.message
      if (key === "password") fieldErrors.password = issue.message
    }
    return { fieldErrors }
  }

  const { email, password } = parsed.data

  try {
    const res = await post<LoginResponse>(endpoints.auth.login, {
      email,
      password,
    })
    await setAuthTokens(res.data)
    redirect(routes.home)
  } catch (e) {
    unstable_rethrow(e)
    if (isApiError(e)) {
      const msg =
        e.message ||
        (e.status === 401
          ? "Invalid email or password"
          : "Something went wrong. Try again.")
      return { error: msg }
    }
    throw e
  }
}
