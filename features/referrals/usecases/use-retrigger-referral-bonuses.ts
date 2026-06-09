"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { retriggerReferralBonusesAction } from "@/features/referrals/actions"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useRetriggerReferralBonuses(userId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => retriggerReferralBonusesAction(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.referrals.list })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.referrals.stats })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.referrals.detail(userId),
      })
      toast.success("Referral bonuses retriggered")
    },
    onError: (e) => {
      toast.error(
        e instanceof Error ? e.message : "Could not retrigger referral bonuses"
      )
    },
  })
}
