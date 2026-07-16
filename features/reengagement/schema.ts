import { z } from "zod"

export const updateReengagementConfigFormSchema = z.object({
  masterEnabled: z.boolean(),
  kycReminderEnabled: z.boolean(),
  firstSaveReminderEnabled: z.boolean(),
  referEarnReminderEnabled: z.boolean(),
  pushEnabled: z.boolean(),
  emailEnabled: z.boolean(),
  sendHour: z
    .number()
    .int("Must be a whole hour")
    .min(0, "Hour must be between 0 and 23")
    .max(23, "Hour must be between 0 and 23"),
})

export type UpdateReengagementConfigFormValues = z.infer<
  typeof updateReengagementConfigFormSchema
>
