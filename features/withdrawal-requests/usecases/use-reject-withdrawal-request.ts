"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { rejectWithdrawalRequestAction } from "@/features/withdrawal-requests/actions"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useRejectWithdrawalRequest(withdrawalRequestId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => rejectWithdrawalRequestAction(withdrawalRequestId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.withdrawalRequests.list,
      })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.withdrawalRequests.detail(withdrawalRequestId),
      })
      toast.success("Withdrawal request rejected")
    },
    onError: (e) => {
      toast.error(
        e instanceof Error ? e.message : "Could not reject withdrawal request"
      )
    },
  })
}
