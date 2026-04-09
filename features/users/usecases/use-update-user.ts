"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { updateUserAction } from "@/features/users/actions"
import type { UpdateUserFormValues } from "@/features/users/schema"
import { QUERY_KEYS } from "@/lib/query-keys"

/**
 * Updates a user via server action; invalidates list + detail queries and toasts on success.
 */
export function useUpdateUser(userId: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (values: UpdateUserFormValues) =>
      updateUserAction(userId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.all })
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.users.list })
      toast.success("User updated")
    },
    onError: (e) => {
      toast.error(e instanceof Error ? e.message : "Could not update user")
    },
  })
}
