"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { updateFixedRateBandAction } from "@/features/savings/actions"
import type { UpdateFixedRateBandPayload } from "@/features/savings/types"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useUpdateFixedRateBand(bandId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateFixedRateBandPayload) =>
      updateFixedRateBandAction(bandId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.savings.fixedBands })
      toast.success("Fixed band updated")
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : "Could not update band")
      console.error("Update fixed rate band error:", e)
    },
  })
}
