"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { updateFeatureFlagAction } from "@/features/feature-flags/actions"
import type {
  FeatureFlag,
  UpdateFeatureFlagPayload,
} from "@/features/feature-flags/types"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useUpdateFeatureFlag(key: string) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: UpdateFeatureFlagPayload) =>
      updateFeatureFlagAction(key, payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.featureFlags.list })

      const previous = queryClient.getQueryData<FeatureFlag[]>(
        QUERY_KEYS.featureFlags.list
      )

      queryClient.setQueryData<FeatureFlag[]>(
        QUERY_KEYS.featureFlags.list,
        (old) =>
          old?.map((flag) =>
            flag.key === key
              ? {
                  ...flag,
                  androidEnabled:
                    payload.androidEnabled ?? flag.androidEnabled,
                  iosEnabled: payload.iosEnabled ?? flag.iosEnabled,
                }
              : flag
          ) ?? []
      )

      return { previous }
    },
    onSuccess: () => {
      toast.success("Feature flag updated")
    },
    onError: (e, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(
          QUERY_KEYS.featureFlags.list,
          context.previous
        )
      }
      toast.error(
        e instanceof Error ? e.message : "Could not update feature flag"
      )
      console.error("Update feature flag error:", e)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.featureFlags.all })
    },
  })
}
