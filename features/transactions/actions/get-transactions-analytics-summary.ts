"use server"

import { get } from "@/lib/api/axios"
import type { TransactionsAnalyticsSummary } from "@/features/transactions/types"
import { endpoints } from "@/lib/endpoints"
import type { AnalyticsApiEnvelope } from "@/lib/types/analytics-api"

export async function getTransactionsAnalyticsSummaryAction(): Promise<TransactionsAnalyticsSummary> {
  const { data } = await get<AnalyticsApiEnvelope<TransactionsAnalyticsSummary>>(
    endpoints.admin.transactionsAnalyticsSummary
  )
  return data.data
}
