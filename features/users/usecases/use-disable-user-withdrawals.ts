"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { disableUserWithdrawalsAction } from "@/features/users/actions"
import type { WithdrawalsReasonFormValues } from "@/features/users/schema"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useDisableUserWithdrawals(userId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: WithdrawalsReasonFormValues) =>
      disableUserWithdrawalsAction(userId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.list })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.users.detail(userId),
      })
      toast.success("Withdrawals disabled")
    },
    onError: (e) => {
      toast.error(
        e instanceof Error ? e.message : "Could not disable withdrawals"
      )
    },
  })
}
