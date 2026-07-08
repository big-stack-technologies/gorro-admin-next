"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { updateAjoConfigAction } from "@/features/ajo/actions"
import type { UpdateAjoConfigPayload } from "@/features/ajo/types"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useUpdateAjoConfig() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateAjoConfigPayload) =>
      updateAjoConfigAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ajo.all })
      toast.success("Ajo settings updated")
    },
    onError: (e) => {
      toast.error(
        e instanceof Error ? e.message : "Could not update Ajo settings"
      )
      console.error("Update Ajo config error:", e)
    },
  })
}
