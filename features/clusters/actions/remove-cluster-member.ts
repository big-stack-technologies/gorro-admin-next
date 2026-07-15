"use server"

import { del } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"

export async function removeClusterMemberAction(
  clusterId: string,
  userId: string
): Promise<void> {
  await del(endpoints.admin.clusterMemberByUserId(clusterId, userId))
}
