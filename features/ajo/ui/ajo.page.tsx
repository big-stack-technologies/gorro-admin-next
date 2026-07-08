"use client"

import { AdminPageHeader } from "@/components/admin-page-header"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { AjoConfigSection } from "@/features/ajo/ui/ajo-config-section"
import { CreateAjoGroupForm } from "@/features/ajo/ui/create-ajo-group-form"

export function AjoPage() {
  return (
    <div className="flex flex-col gap-8 px-4 pb-8 lg:px-6">
      <AdminPageHeader
        title="Ajo"
        description="Manage platform defaults and create Gorro public rotating savings groups."
      />

      <Tabs defaultValue="settings" className="gap-6">
        <TabsList className="h-9 w-fit justify-start">
          <TabsTrigger value="settings" className="flex-none text-xs sm:text-sm">
            Settings
          </TabsTrigger>
          <TabsTrigger value="create" className="flex-none text-xs sm:text-sm">
            Create group
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="mt-0">
          <AjoConfigSection />
        </TabsContent>

        <TabsContent value="create" className="mt-0">
          <CreateAjoGroupForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
