"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { broadcastReengagementAction } from "@/features/reengagement/actions"
import type { BroadcastReengagementPayload } from "@/features/reengagement/types"
import { unwrapActionResult } from "@/lib/actions/action-result"
import { getApiErrorMessage } from "@/lib/api/api-error"

export function useBroadcastReengagement() {
  return useMutation({
    mutationFn: async (payload: BroadcastReengagementPayload) =>
      unwrapActionResult(await broadcastReengagementAction(payload)),
    onSuccess: (response) => {
      toast.success(
        `Push sent to ${response.recipients.toLocaleString()} recipient${response.recipients === 1 ? "" : "s"}`
      )
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
      console.error("Broadcast re-engagement error:", error)
    },
  })
}
