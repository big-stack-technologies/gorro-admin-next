"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { resetUserPinAction } from "@/features/users/actions"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useResetUserPin(userId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => resetUserPinAction(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.list })
      toast.success("PIN reset — temporary PIN issued")
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : "Could not reset PIN")
    },
  })
}
