"use client"

import { useMemo, useState } from "react"
import {
  EyeIcon,
  KeyRoundIcon,
  PencilIcon,
  ShieldCheckIcon,
  SnowflakeIcon,
  UserCogIcon,
} from "lucide-react"

import {
  DataTableRowActions,
  type DataTableRowActionGroup,
} from "@/components/data-table"
import { useGetProfile } from "@/features/auth/usecases"
import { USER_ROLE } from "@/features/users/constants"
import type { User } from "@/features/users/types"

import { UserChangeRoleDialog } from "./user-change-role-dialog"
import { UserDetailsDialog } from "./user-details-dialog"
import { UserFreezeDialog } from "./user-freeze-dialog"
import { UserResetPinAlertDialog } from "./user-reset-pin-alert-dialog"
import { UserUpdateDialog } from "./user-update-dialog"

type UserRowActionGroupsParams = {
  isSuperAdmin: boolean
  onViewUser: () => void
  onUpdateUser: () => void
  onChangeRole: () => void
  onFreeze: () => void
  onResetPin: () => void
}

function useUserRowActionGroups(
  params: UserRowActionGroupsParams
): DataTableRowActionGroup[] {
  const {
    isSuperAdmin,
    onViewUser,
    onUpdateUser,
    onChangeRole,
    onFreeze,
    onResetPin,
  } = params

  return useMemo(
    () => [
      {
        id: "account",
        items: [
          {
            id: "view",
            label: "View user",
            icon: EyeIcon,
            onSelect: onViewUser,
          },
          {
            id: "update",
            label: "Update user",
            icon: PencilIcon,
            onSelect: onUpdateUser,
          },
          ...(isSuperAdmin
            ? [
                {
                  id: "role",
                  label: "Change user role",
                  icon: UserCogIcon,
                  onSelect: onChangeRole,
                },
              ]
            : []),
        ],
      },
      {
        id: "risk",
        items: [
          ...(isSuperAdmin
            ? [
                {
                  id: "freeze",
                  label: "Freeze",
                  icon: SnowflakeIcon,
                  onSelect: onFreeze,
                },
                {
                  id: "reset-pin",
                  label: "Reset PIN",
                  icon: KeyRoundIcon,
                  onSelect: onResetPin,
                },
              ]
            : []),
          {
            id: "kyc",
            label: "Verify KYC status",
            icon: ShieldCheckIcon,
            onSelect: () => {
              /* TODO: verify KYC status */
            },
          },
        ],
      },
    ],
    [
      isSuperAdmin,
      onViewUser,
      onUpdateUser,
      onChangeRole,
      onFreeze,
      onResetPin,
    ]
  )
}

type UserRowActionsProps = {
  user: User
}

export function UserRowActions({ user }: UserRowActionsProps) {
  const { data: profile } = useGetProfile()
  const isSuperAdmin =
    profile?.roles?.includes(USER_ROLE.super_admin) === true

  const [viewOpen, setViewOpen] = useState(false)
  const [updateOpen, setUpdateOpen] = useState(false)
  const [roleOpen, setRoleOpen] = useState(false)
  const [freezeOpen, setFreezeOpen] = useState(false)
  const [resetPinOpen, setResetPinOpen] = useState(false)

  const openActions = useMemo(
    () => ({
      onViewUser: () => setViewOpen(true),
      onUpdateUser: () => setUpdateOpen(true),
      onChangeRole: () => setRoleOpen(true),
      onFreeze: () => setFreezeOpen(true),
      onResetPin: () => setResetPinOpen(true),
    }),
    []
  )

  const groups = useUserRowActionGroups({
    isSuperAdmin,
    ...openActions,
  })

  return (
    <>
      <DataTableRowActions
        subjectLabel={user.email}
        menuTitle={user.email}
        groups={groups}
      />
      <UserDetailsDialog user={user} open={viewOpen} onOpenChange={setViewOpen} />
      <UserUpdateDialog user={user} open={updateOpen} onOpenChange={setUpdateOpen} />
      {isSuperAdmin ? (
        <>
          <UserChangeRoleDialog
            user={user}
            open={roleOpen}
            onOpenChange={setRoleOpen}
          />
          <UserFreezeDialog
            user={user}
            open={freezeOpen}
            onOpenChange={setFreezeOpen}
          />
          <UserResetPinAlertDialog
            user={user}
            open={resetPinOpen}
            onOpenChange={setResetPinOpen}
          />
        </>
      ) : null}
    </>
  )
}
