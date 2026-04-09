/** URL / API query keys for listing users (with page & limit). */
export const USER_LIST_FILTER_KEYS = [
  "email",
  "phoneNumber",
  "role",
  "firstName",
  "lastName",
] as const

export type UserListFilterKey = (typeof USER_LIST_FILTER_KEYS)[number]

/**
 * Single source of truth for user role string values (API + admin UI).
 * Add or reorder roles here only.
 */
export const USER_ROLES = [
  "user",
  "super_admin",
  "moderator",
  "support_agent",
] as const

export type UserRole = (typeof USER_ROLES)[number]

/**
 * Named access to role string literals (e.g. `USER_ROLE.moderator`, `USER_ROLE.super_admin`).
 * Prefer this over raw strings when checking or comparing roles in code.
 */
export const USER_ROLE = {
  user: "user",
  super_admin: "super_admin",
  moderator: "moderator",
  support_agent: "support_agent",
} as const satisfies Record<UserRole, UserRole>

const USER_ROLE_LABELS: Record<UserRole, string> = {
  user: "User",
  super_admin: "Super admin",
  moderator: "Moderator",
  support_agent: "Support agent",
}

/** Select / filter options: same values as {@link USER_ROLES}, with labels. */
export const USER_ROLE_FILTER_OPTIONS = USER_ROLES.map((value) => ({
  value,
  label: USER_ROLE_LABELS[value],
}))
