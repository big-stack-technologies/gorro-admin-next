"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { approveTransactionAction } from "@/features/transactions/actions"
import type { TransactionReasonPayload } from "@/features/transactions/schema"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useApproveTransaction(transactionId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: TransactionReasonPayload) =>
      approveTransactionAction(transactionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.transactions.list })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.transactions.detail(transactionId),
      })
      toast.success("Transaction approved")
    },
    onError: (e) => {
      toast.error(
        e instanceof Error ? e.message : "Could not approve transaction"
      )
    },
  })
}
