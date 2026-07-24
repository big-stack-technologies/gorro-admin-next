export type ReengagementCampaign =
  | "COMPLETE_KYC"
  | "START_SAVING"
  | "REFER_EARN"

export type ReengagementChannel = "PUSH" | "EMAIL"

export type ReengagementConfig = {
  id: string
  masterEnabled: boolean
  kycReminderEnabled: boolean
  firstSaveReminderEnabled: boolean
  referEarnReminderEnabled: boolean
  pushEnabled: boolean
  emailEnabled: boolean
  sendHour: number
  createdAt: string
  updatedAt: string
}

export type UpdateReengagementConfigPayload = Partial<{
  masterEnabled: boolean
  kycReminderEnabled: boolean
  firstSaveReminderEnabled: boolean
  referEarnReminderEnabled: boolean
  pushEnabled: boolean
  emailEnabled: boolean
  sendHour: number
}>

export type ReengagementNudge = {
  id: string
  campaign: ReengagementCampaign
  channel: ReengagementChannel
  sentAt: string
  userId: string
  name: string
  email: string
  phone: string
  kycTier: number
}

export type ReengagementSegment = {
  campaign: ReengagementCampaign
  enabled: boolean
  usersInSegment: number
  dueNow: number
  schedule: string
  lifetimeCap: number
}

export type ReengagementSegmentsResponse = {
  generatedAt: string
  masterEnabled: boolean
  segments: ReengagementSegment[]
}

export type SegmentUser = {
  userId: string
  name: string
  email: string
  phone: string
  signedUpAt: string
  nudgesSent: number
  lastNudgeAt: string | null
  dueNow: boolean
}

export type RunReengagementResponse = {
  success: boolean
  results: Partial<Record<ReengagementCampaign, number>>
  message: string
}

export type ReengagementApiPaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore?: boolean
}

export type ReengagementAudience = "ALL" | "VERIFIED" | "UNVERIFIED"

export type BroadcastReengagementPayload = {
  title: string
  body: string
  audience?: ReengagementAudience
  email?: string
}

export type BroadcastReengagementResponse = {
  audience: string
  recipients: number
  title: string
  body: string
}

export type SendReengagementEmailPayload = {
  subject: string
  body: string
  emails?: string[]
  audience?: ReengagementAudience
}

export type SendReengagementEmailResponse = {
  recipients: number
  estimatedSeconds: number
  notFound?: string[]
}
