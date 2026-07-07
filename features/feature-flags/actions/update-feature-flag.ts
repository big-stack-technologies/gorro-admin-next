"use server"

import { patch } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type {
  FeatureFlag,
  UpdateFeatureFlagPayload,
} from "@/features/feature-flags/types"

export async function updateFeatureFlagAction(
  key: string,
  payload: UpdateFeatureFlagPayload
): Promise<FeatureFlag> {
  const { data } = await patch<FeatureFlag>(
    endpoints.admin.featureFlagByKey(key),
    payload
  )
  return data
}
