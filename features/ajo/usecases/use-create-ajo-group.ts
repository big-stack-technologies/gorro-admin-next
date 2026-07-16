"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { createAjoGroupAction } from "@/features/ajo/actions"
import type { CreateAjoGroupPayload } from "@/features/ajo/types"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useCreateAjoGroup() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateAjoGroupPayload) =>
      createAjoGroupAction(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ajo.groups.list })
      toast.success("Ajo group created")
    },
    onError: (e) => {
      toast.error(
        e instanceof Error ? e.message : "Could not create Ajo group"
      )
      console.error("Create Ajo group error:", e)
    },
  })
}
