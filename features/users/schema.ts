import { z } from "zod"

import { USER_ROLES } from "@/features/users/constants"

export const USER_GENDERS = ["male", "female", "unknown"] as const

export const updateUserFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string(),
  gender: z.enum(USER_GENDERS),
  nin: z.string(),
  bvn: z.string(),
})

export type UpdateUserFormValues = z.infer<typeof updateUserFormSchema>

export type UpdateUserPayload = UpdateUserFormValues

export const changeUserRoleFormSchema = z.object({
  role: z.enum(USER_ROLES),
  reason: z.string().min(1, "Reason is required"),
})

export type ChangeUserRoleFormValues = z.infer<typeof changeUserRoleFormSchema>

export type ChangeUserRolePayload = ChangeUserRoleFormValues

export const freezeUserFormSchema = z.object({
  reason: z.string().min(1, "Reason is required"),
})

export type FreezeUserFormValues = z.infer<typeof freezeUserFormSchema>

export type FreezeUserPayload = FreezeUserFormValues
