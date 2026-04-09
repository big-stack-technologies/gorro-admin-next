"use client"

import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import type { User } from "@/features/users/types"
import { useGetUser } from "@/features/users/usecases"
import { isApiError } from "@/lib/api/api-error"
import {
  cn,
  formatDateTime,
  formatNgn,
  formatSnakeCaseWords,
  joinPartsOrEmDash,
} from "@/lib/utils"

type UserDetailsDialogProps = {
  user: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

function DetailRow({
  label,
  value,
  className,
}: {
  label: string
  value: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-x-4 gap-y-1 border-b border-border/60 py-2.5 last:border-b-0 sm:grid-cols-[140px_1fr]",
        className
      )}
    >
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="min-w-0 wrap-break-word font-medium">{value}</dd>
    </div>
  )
}

export function UserDetailsDialog({
  user,
  open,
  onOpenChange,
}: UserDetailsDialogProps) {
  const userQuery = useGetUser(user.id, open)
  const {
    data: userDetail,
    isPending: isUserLoading,
    isError: isUserError,
  } = userQuery

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 p-0 sm:max-w-lg">
        <DialogHeader className="border-b px-4 py-4">
          <DialogTitle>User details</DialogTitle>
          <DialogDescription className="truncate">{user.email}</DialogDescription>
        </DialogHeader>

        <div className="max-h-[min(70vh,520px)] overflow-y-auto px-4">
          <dl className="py-2">
            <DetailRow label="Email" value={user.email ?? "—"} />
            <DetailRow label="Phone" value={user.phoneNumber ?? "—"} />
            <DetailRow
              label="Name"
              value={joinPartsOrEmDash([
                user.firstName,
                user.middleName,
                user.lastName,
              ])}
            />
            <DetailRow
              label="Gender"
              value={user.gender === "unknown" ? "Unknown" : user.gender}
            />
            <DetailRow label="Role" value={formatSnakeCaseWords(user.role)} />
            <DetailRow label="NIN" value={user.nin ?? "—"} />
            <DetailRow label="BVN" value={user.bvn ?? "—"} />
            <DetailRow
              label="Accounts"
              value={
                isUserLoading ? (
                  <Skeleton className="inline-block h-4 w-12" />
                ) : isUserError || userDetail == null ? (
                  "—"
                ) : (
                  String(userDetail.accountCount)
                )
              }
            />
            <DetailRow
              label="Total balance"
              value={
                isUserLoading ? (
                  <Skeleton className="inline-block h-4 w-28" />
                ) : isUserError || userDetail == null ? (
                  "—"
                ) : (
                  formatNgn(userDetail.totalBalance)
                )
              }
            />
            <DetailRow label="Created" value={formatDateTime(user.createdAt)} />
            <DetailRow label="Updated" value={formatDateTime(user.updatedAt)} />
          </dl>

          {isUserError ? (
            <div className="flex flex-col gap-2 border-t border-border/60 py-4">
              <p className="text-sm text-destructive">
                {isApiError(userQuery.error)
                  ? userQuery.error.message
                  : "Could not load user details."}
              </p>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-fit"
                onClick={() => userQuery.refetch()}
              >
                Retry
              </Button>
            </div>
          ) : null}
        </div>

        <div className="flex justify-end gap-2 border-t bg-muted/50 p-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
