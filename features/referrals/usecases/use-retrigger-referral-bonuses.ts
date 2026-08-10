"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { retriggerReferralBonusesAction } from "@/features/referrals/actions"
import { unwrapActionResult } from "@/lib/actions/action-result"
import { getApiErrorMessage } from "@/lib/api/api-error"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useRetriggerReferralBonuses(userId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () =>
      unwrapActionResult(await retriggerReferralBonusesAction(userId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.referrals.list })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.referrals.stats })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.referrals.detail(userId),
      })
      toast.success("Referral bonuses retriggered")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
      console.error("Retrigger referral bonuses error:", error)
    },
  })
}
