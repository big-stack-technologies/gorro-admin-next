"use client"

import { AdminPageHeader } from "@/components/admin-page-header"
import { DataTable } from "@/components/data-table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { listReengagementNudgesAction } from "@/features/reengagement/actions"
import { reengagementNudgesColumns } from "@/features/reengagement/columns"
import { reengagementNudgesTableFilters } from "@/features/reengagement/table-filters"
import { ReengagementConfigSection } from "@/features/reengagement/ui/reengagement-config-section"
import { ReengagementSegmentsSection } from "@/features/reengagement/ui/reengagement-segments-section"
import { QUERY_KEYS } from "@/lib/query-keys"

export function ReengagementPage() {
  return (
    <div className="flex flex-col gap-8 px-4 pb-8 lg:px-6">
      <AdminPageHeader
        title="Re-engagement"
        description="Manage automated push nudges, review live segments, and inspect send history."
      />

      <Tabs defaultValue="segments" className="gap-6">
        <TabsList className="h-9 w-fit justify-start">
          <TabsTrigger value="segments" className="flex-none text-xs sm:text-sm">
            Segments
          </TabsTrigger>
          <TabsTrigger value="history" className="flex-none text-xs sm:text-sm">
            History
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex-none text-xs sm:text-sm">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="segments" className="mt-0">
          <ReengagementSegmentsSection />
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          <DataTable
            columns={reengagementNudgesColumns}
            fetchData={listReengagementNudgesAction}
            queryKey={QUERY_KEYS.reengagement.nudges.list}
            paginationNamespace="nudges"
            filters={reengagementNudgesTableFilters}
            emptyMessage="No nudges match these filters."
          />
        </TabsContent>

        <TabsContent value="settings" className="mt-0">
          <ReengagementConfigSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}
