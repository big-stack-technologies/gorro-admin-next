import { routes } from "@/lib/routes"

export type BreadcrumbSegment = {
  label: string
  /** Omit for the current page segment. */
  href?: string
}

/**
 * Breadcrumb trail for admin shell routes. Extend as you add `/admin/*` pages.
 */
export function getAdminBreadcrumbSegments(pathname: string): BreadcrumbSegment[] {
  const admin = routes.protected.admin.base
  const users = routes.protected.users.base
  const transactions = routes.protected.transactions.base

  const normalized =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname

  if (normalized === admin) {
    return [{ label: "Dashboard" }]
  }

  if (normalized === users) {
    return [
      { label: "Dashboard", href: admin },
      { label: "Users" },
    ]
  }

  if (normalized.startsWith(`${users}/`)) {
    return [
      { label: "Dashboard", href: admin },
      { label: "Users", href: users },
      { label: "User details" },
    ]
  }

  if (normalized === transactions) {
    return [
      { label: "Dashboard", href: admin },
      { label: "Transactions" },
    ]
  }

  if (normalized.startsWith(`${transactions}/`)) {
    return [
      { label: "Dashboard", href: admin },
      { label: "Transactions", href: transactions },
      { label: "Transaction details" },
    ]
  }

  if (normalized.startsWith(`${admin}/`)) {
    const rest = normalized.slice(admin.length + 1)
    const first = rest.split("/")[0] ?? ""
    const label =
      first.length > 0
        ? first.charAt(0).toUpperCase() +
          first.slice(1).replace(/-/g, " ")
        : "Page"
    return [{ label: "Dashboard", href: admin }, { label }]
  }

  return [{ label: "Admin" }]
}
