"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { updateSavingsRateAction } from "@/features/savings/actions"
import type {
  SavingsProductType,
  UpdateSavingsRatePayload,
} from "@/features/savings/types"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useUpdateSavingsRate(productType: SavingsProductType) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateSavingsRatePayload) =>
      updateSavingsRateAction(productType, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.savings.rates })
      toast.success("Rate updated")
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : "Could not update rate")
      console.error("Update savings rate error:", e)
    },
  })
}
