"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import { createAjoGroupAction } from "@/features/ajo/actions"
import type { CreateAjoGroupPayload } from "@/features/ajo/types"

export function useCreateAjoGroup() {
  return useMutation({
    mutationFn: (payload: CreateAjoGroupPayload) =>
      createAjoGroupAction(payload),
    onSuccess: () => {
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
