"use server"

import { redirect } from "next/navigation"

import { removeAuthTokens } from "@/lib/cookies"
import { routes } from "@/lib/routes"

export async function logoutAction() {
  await removeAuthTokens()
  redirect(routes.public.login)
}
