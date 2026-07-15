"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { updateClusterAction } from "@/features/clusters/actions"
import type { UpdateClusterPayload } from "@/features/clusters/schema"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useUpdateCluster(clusterId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateClusterPayload) =>
      updateClusterAction(clusterId, payload),
    onSuccess: (cluster) => {
      queryClient.setQueryData(QUERY_KEYS.clusters.detail(clusterId), cluster)
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.clusters.list })
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.clusters.analytics.all,
      })
      toast.success("Cluster updated")
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Could not update cluster"
      )
    },
  })
}
