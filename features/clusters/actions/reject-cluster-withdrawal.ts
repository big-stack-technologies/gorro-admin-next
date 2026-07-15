"use server"

import type { RejectClusterWithdrawalPayload } from "@/features/clusters/schema"
import { post } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"

export async function rejectClusterWithdrawalAction(
  clusterId: string,
  requestId: string,
  payload: RejectClusterWithdrawalPayload
): Promise<void> {
  await post(
    endpoints.admin.clusterWithdrawalForceRejectById(clusterId, requestId),
    payload
  )
}
