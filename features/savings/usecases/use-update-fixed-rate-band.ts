"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { updateFixedRateBandAction } from "@/features/savings/actions"
import type { UpdateFixedRateBandPayload } from "@/features/savings/types"
import { unwrapActionResult } from "@/lib/actions/action-result"
import { getApiErrorMessage } from "@/lib/api/api-error"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useUpdateFixedRateBand(bandId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: UpdateFixedRateBandPayload) =>
      unwrapActionResult(await updateFixedRateBandAction(bandId, payload)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.savings.fixedBands })
      toast.success("Fixed band updated")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
      console.error("Update fixed rate band error:", error)
    },
  })
}
