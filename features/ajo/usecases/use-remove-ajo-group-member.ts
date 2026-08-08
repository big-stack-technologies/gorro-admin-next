"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { removeAjoGroupMemberAction } from "@/features/ajo/actions"
import { getApiErrorMessage } from "@/lib/api/api-error"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useRemoveAjoGroupMember(groupId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (memberId: string) =>
      removeAjoGroupMemberAction(groupId, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ajo.groups.list })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ajo.groups.detail(groupId),
      })
      toast.success("Member removed")
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error))
      console.error("Remove Ajo group member error:", error)
    },
  })
}
