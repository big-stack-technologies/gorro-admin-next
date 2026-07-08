import type { AjoFrequency, AjoPenaltyScope } from "@/features/ajo/types"

export const AJO_FREQUENCIES = ["DAILY", "WEEKLY", "MONTHLY"] as const

export const AJO_PENALTY_SCOPES = ["PUBLIC_ONLY", "ALL"] as const

const AJO_FREQUENCY_LABELS: Record<AjoFrequency, string> = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
}

const AJO_PENALTY_SCOPE_LABELS: Record<AjoPenaltyScope, string> = {
  PUBLIC_ONLY: "Public groups only",
  ALL: "All groups",
}

export function getAjoFrequencyLabel(frequency: AjoFrequency) {
  return AJO_FREQUENCY_LABELS[frequency] ?? frequency
}

export function getAjoPenaltyScopeLabel(scope: AjoPenaltyScope) {
  return AJO_PENALTY_SCOPE_LABELS[scope] ?? scope
}

export const AJO_FREQUENCY_OPTIONS = AJO_FREQUENCIES.map((value) => ({
  value,
  label: getAjoFrequencyLabel(value),
}))

export const AJO_PENALTY_SCOPE_OPTIONS = AJO_PENALTY_SCOPES.map((value) => ({
  value,
  label: getAjoPenaltyScopeLabel(value),
}))

export function bpsToPercent(bps: number) {
  return bps / 100
}

export function percentToBps(percent: number) {
  return Math.round(percent * 100)
}

export function nairaToMinorUnits(naira: number) {
  return Math.round(naira * 100)
}
