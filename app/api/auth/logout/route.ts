import { NextResponse } from "next/server"

import { removeAuthTokens } from "@/lib/cookies"

/** Clears session cookies; cookie mutation is only allowed here (Route Handler), not from RSC. */
export async function POST() {
  await removeAuthTokens()
  return new NextResponse(null, { status: 204 })
}
