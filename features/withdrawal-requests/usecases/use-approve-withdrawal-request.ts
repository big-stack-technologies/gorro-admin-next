"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { approveWithdrawalRequestAction } from "@/features/withdrawal-requests/actions"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useApproveWithdrawalRequest(withdrawalRequestId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => approveWithdrawalRequestAction(withdrawalRequestId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.withdrawalRequests.list,
      })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.withdrawalRequests.detail(withdrawalRequestId),
      })
      toast.success("Withdrawal request approved")
    },
    onError: (e) => {
      toast.error(
        e instanceof Error ? e.message : "Could not approve withdrawal request"
      )
    },
  })
}
