"use client"

import * as React from "react"

import { NavMain } from "@/components/partials/nav-main"
import { NavSecondary } from "@/components/partials/nav-secondary"
import { NavUserProfile } from "@/components/partials/nav-user-profile"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  UsersIcon,
  CameraIcon,
  FileTextIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  ArrowLeftRightIcon,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { routes } from "@/lib/routes"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: routes.protected.admin.base,
      icon: (
        <LayoutDashboardIcon
        />
      ),
    },
    {
      title: "Users",
      url: routes.protected.users.base,
      icon: (
        <UsersIcon
        />
      ),
    },
    {
      title: "Transactions",
      url: routes.protected.transactions.base,
      icon: (
        <ArrowLeftRightIcon
        />
      ),
    },
  ],
  navClouds: [
    {
      title: "Capture",
      icon: (
        <CameraIcon
        />
      ),
      isActive: true,
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Proposal",
      icon: (
        <FileTextIcon
        />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
    {
      title: "Prompts",
      icon: (
        <FileTextIcon
        />
      ),
      url: "#",
      items: [
        {
          title: "Active Proposals",
          url: "#",
        },
        {
          title: "Archived",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
    },
    {
      title: "Get Help",
      url: "#",
      icon: (
        <CircleHelpIcon
        />
      ),
    },
    {
      title: "Search",
      url: "#",
      icon: (
        <SearchIcon
        />
      ),
    },
  ],
  // documents: [
  //   {
  //     name: "Data Library",
  //     url: "#",
  //     icon: (
  //       <DatabaseIcon
  //       />
  //     ),
  //   },
  //   {
  //     name: "Reports",
  //     url: "#",
  //     icon: (
  //       <FileChartColumnIcon
  //       />
  //     ),
  //   },
  //   {
  //     name: "Word Assistant",
  //     url: "#",
  //     icon: (
  //       <FileIcon
  //       />
  //     ),
  //   },
  // ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link
                href={routes.protected.admin.base}
                className="flex items-center gap-2"
              >
                <Image
                  src="/logos/gorro-logo.svg"
                  alt="Gorro"
                  width={96}
                  height={24}
                  className="h-5 w-auto dark:hidden"
                  priority
                />
                <Image
                  src="/logos/gorro-logo-white.svg"
                  alt=""
                  width={161}
                  height={40}
                  className="hidden h-5 w-auto dark:block"
                  aria-hidden
                  priority
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUserProfile />
      </SidebarFooter>
    </Sidebar>
  )
}
