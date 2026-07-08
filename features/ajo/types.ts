export type AjoPenaltyScope = "PUBLIC_ONLY" | "ALL"

export type AjoGroupType = "PUBLIC" | "PRIVATE"

export type AjoFrequency = "DAILY" | "WEEKLY" | "MONTHLY"

export type AjoGroupStatus =
  | "FORMING"
  | "ACTIVE"
  | "COMPLETED"
  | "CANCELLED"

export type AjoConfig = {
  id: string
  minContributionMinor: number
  minContributionNaira: number
  maxSlotsPerGroup: number
  maxSlotsPerMember: number
  penaltyPercentBps: number
  penaltyMinNaira: number
  penaltyMaxNaira: number
  graceWindowHours: number
  penaltyScope: AjoPenaltyScope
  updatedAt: string
}

export type UpdateAjoConfigPayload = {
  minContributionMinor?: number
  maxSlotsPerGroup?: number
  maxSlotsPerMember?: number
  penaltyPercentBps?: number
  penaltyMinMinor?: number
  penaltyMaxMinor?: number
  graceWindowHours?: number
  penaltyScope?: AjoPenaltyScope
}

export type CreateAjoGroupPayload = {
  name: string
  type: "PUBLIC"
  contributionAmount: number
  frequency: AjoFrequency
  startDate: string
  slotCount: number
  perMemberSlotCap?: number
  imageUrl?: string
  description?: string
  penaltyAmount?: number
}

export type AjoGroup = {
  id: string
  name: string
  code: string
  type: AjoGroupType
  status: AjoGroupStatus
  contributionAmount: number
  frequency: AjoFrequency
  startDate: string
  slotsTotal: number
  slotsFilled: number
  slotsRemaining: number
  imageUrl?: string | null
  description?: string | null
}
