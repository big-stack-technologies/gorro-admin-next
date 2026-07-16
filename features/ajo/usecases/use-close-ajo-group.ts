"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { closeAjoGroupAction } from "@/features/ajo/actions"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useCloseAjoGroup(groupId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => closeAjoGroupAction(groupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ajo.groups.list })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ajo.groups.detail(groupId),
      })
      toast.success("Ajo group closed")
    },
    onError: (e) => {
      toast.error(
        e instanceof Error ? e.message : "Could not close Ajo group"
      )
      console.error("Close Ajo group error:", e)
    },
  })
}
