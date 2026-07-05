"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { updateWhtConfigAction } from "@/features/savings/actions"
import type { UpdateWhtConfigPayload } from "@/features/savings/types"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useUpdateWhtConfig() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateWhtConfigPayload) =>
      updateWhtConfigAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.savings.wht })
      toast.success("WHT config updated")
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : "Could not update WHT")
      console.error("Update WHT config error:", e)
    },
  })
}
