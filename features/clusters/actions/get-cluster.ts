"use server"

import type { ClusterDetail } from "@/features/clusters/types"
import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"

export async function getClusterAction(id: string): Promise<ClusterDetail> {
  const { data } = await get<ClusterDetail>(endpoints.admin.clusterById(id))
  return data
}
