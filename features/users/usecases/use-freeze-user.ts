"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { freezeUserAction } from "@/features/users/actions"
import type { FreezeUserFormValues } from "@/features/users/schema"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useFreezeUser(userId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: FreezeUserFormValues) =>
      freezeUserAction(userId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.list })
      toast.success("Account frozen")
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : "Could not freeze account")
    },
  })
}
