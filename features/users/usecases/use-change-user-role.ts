"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { changeUserRoleAction } from "@/features/users/actions"
import type { ChangeUserRoleFormValues } from "@/features/users/schema"
import { QUERY_KEYS } from "@/lib/query-keys"

/**
 * POST role change; invalidates users cache and toasts on success.
 */
export function useChangeUserRole(userId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: ChangeUserRoleFormValues) =>
      changeUserRoleAction(userId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.all })
      toast.success("Role updated")
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : "Could not change user role")
    },
  })
}
