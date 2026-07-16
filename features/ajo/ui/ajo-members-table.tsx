"use client"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AJO_CURRENCY } from "@/features/ajo/constants"
import type { AjoGroupMember } from "@/features/ajo/types"
import { formatCurrencyAmount, emptyAsNa } from "@/lib/utils"

type AjoMembersTableProps = {
  members: AjoGroupMember[]
}

export function AjoMembersTable({ members }: AjoMembersTableProps) {
  if (members.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No members in this group.</p>
    )
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border/80">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Member</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Slots</TableHead>
            <TableHead>Contributed</TableHead>
            <TableHead>Defaults</TableHead>
            <TableHead>Outstanding</TableHead>
            <TableHead>Flags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.memberId}>
              <TableCell>
                <div className="min-w-36">
                  <p className="font-medium">{member.name}</p>
                  {member.isRecipient ? (
                    <Badge variant="outline" className="mt-1">
                      Current recipient
                    </Badge>
                  ) : null}
                </div>
              </TableCell>
              <TableCell>{member.role}</TableCell>
              <TableCell>{member.slotsHeld}</TableCell>
              <TableCell>
                {formatCurrencyAmount(member.totalContributed, AJO_CURRENCY)}
              </TableCell>
              <TableCell>{member.defaultCount}</TableCell>
              <TableCell>
                {formatCurrencyAmount(member.outstandingOwed, AJO_CURRENCY)}
              </TableCell>
              <TableCell>
                {member.flagged ? (
                  <Badge variant="destructive">Flagged</Badge>
                ) : (
                  emptyAsNa(null)
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
