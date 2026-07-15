"use server"

import type { UpdateClusterPayload } from "@/features/clusters/schema"
import type { ClusterDetail } from "@/features/clusters/types"
import { patch } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"

export async function updateClusterAction(
  id: string,
  payload: UpdateClusterPayload
): Promise<ClusterDetail> {
  const { data } = await patch<ClusterDetail>(
    endpoints.admin.clusterById(id),
    payload
  )
  return data
}
