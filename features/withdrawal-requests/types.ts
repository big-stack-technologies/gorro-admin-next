export type WithdrawalRequestStatus =
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "FAILED"
  | "PROCESSING"
  | "COMPLETED"

export type WithdrawalRequestProvider = "FINCRA"

export type WithdrawalRequest = {
  id: string
  status: WithdrawalRequestStatus
  provider: WithdrawalRequestProvider | string
  amount: number
  fee: number
  totalDebit: number
  reference: string
  clientReference: string
  recipientAccount: string
  recipientName: string
  bankCode: string
  bankName: string
  narration: string
  createdAt: string
  updatedAt: string
  approvedAt: string | null
  rejectedAt: string | null
  rejectionReason: string | null
  failureReason: string | null
}
