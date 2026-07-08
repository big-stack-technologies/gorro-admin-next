"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { routes } from "@/lib/routes"

export type NavItem = {
  title: string
  url: string
  icon?: React.ReactNode
}

export type NavSection = {
  title?: string
  items: NavItem[]
}

function normalizePathname(pathname: string) {
  return pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname
}

/** Whether `pathname` is under this nav item (exact for dashboard, prefix for section roots). */
function isNavItemActive(pathname: string, itemUrl: string) {
  if (itemUrl === "#") return false

  const path = normalizePathname(pathname)
  const admin = routes.protected.admin.base

  if (itemUrl === admin) {
    return path === admin
  }

  return path === itemUrl || path.startsWith(`${itemUrl}/`)
}

export function NavMain({ sections }: { sections: NavSection[] }) {
  const pathname = usePathname()

  return (
    <>
      {sections.map((section, index) => (
        <SidebarGroup key={section.title ?? `nav-${index}`}>
          {section.title ? (
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          ) : null}
          <SidebarGroupContent>
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    asChild
                    isActive={isNavItemActive(pathname, item.url)}
                  >
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  )
}
