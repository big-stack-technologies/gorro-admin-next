import { getApiErrorMessage, getApiErrorStatus } from "@/lib/api/api-error"

export function getFriendlyBvnErrorMessage(error: unknown): string {
  const message = getApiErrorMessage(error)
  const status = getApiErrorStatus(error)

  if (status === 408 || status === 504 || /timeout/i.test(message)) {
    return "Provider timed out — try again"
  }

  return message
}
