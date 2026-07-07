"use server"

import { get } from "@/lib/api/axios"
import { endpoints } from "@/lib/endpoints"
import type { FeatureFlag } from "@/features/feature-flags/types"

export async function listFeatureFlagsAction(): Promise<FeatureFlag[]> {
  const { data } = await get<FeatureFlag[]>(endpoints.admin.featureFlags)
  return data
}
