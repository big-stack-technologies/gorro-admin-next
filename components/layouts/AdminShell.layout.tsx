import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { AppSidebar } from "@/components/partials/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { canAccessAdminRoute } from "@/features/auth/access"
import { getProfileAction } from "@/features/auth/actions"
import type { AuthProfile } from "@/features/auth/types"
import { PartnerRouteGuard } from "@/features/auth/ui/partner-route-guard"
import { isApiError } from "@/lib/api/api-error"
import { createQueryClient } from "@/lib/query/query-client"
import { QUERY_KEYS } from "@/lib/query-keys"
import { routes } from "@/lib/routes"

export default async function AdminShellLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const queryClient = createQueryClient()
  try {
    await queryClient.fetchQuery({
      queryKey: QUERY_KEYS.session,
      queryFn: getProfileAction,
    })
  } catch (e) {
    if (isApiError(e) && e.status === 401) {
      redirect(routes.api.sessionClear)
    }
    throw e
  }

  const profile = queryClient.getQueryData<AuthProfile>(QUERY_KEYS.session)
  const pathname = (await headers()).get("x-pathname") ?? ""

  if (!canAccessAdminRoute(profile?.roles, pathname)) {
    redirect(routes.protected.admin.base)
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarProvider
        style={
          {
            // "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                <PartnerRouteGuard>{children}</PartnerRouteGuard>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </HydrationBoundary>
  )
}
