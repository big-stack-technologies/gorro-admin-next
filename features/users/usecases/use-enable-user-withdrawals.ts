"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { enableUserWithdrawalsAction } from "@/features/users/actions"
import type { WithdrawalsReasonFormValues } from "@/features/users/schema"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useEnableUserWithdrawals(userId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: WithdrawalsReasonFormValues) =>
      enableUserWithdrawalsAction(userId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.list })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.users.detail(userId),
      })
      toast.success("Withdrawals enabled")
    },
    onError: (e) => {
      toast.error(
        e instanceof Error ? e.message : "Could not enable withdrawals"
      )
    },
  })
}
