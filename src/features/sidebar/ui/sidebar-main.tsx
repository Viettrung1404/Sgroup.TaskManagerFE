"use client"

import { type LucideIcon } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    isActive?: boolean
    items?: {
      title: string
      url: string
      icon?: LucideIcon
    }[]
  }[]
}) {
  return (
    <SidebarGroup className="flex flex-col gap-4">
      {items.map((item) => (
        <div key={item.title} className="flex flex-col">
        <SidebarGroupLabel className="text-sm">{item.title}</SidebarGroupLabel>
        <SidebarMenu>
          {item.items?.map((subItem) => (
            <SidebarMenuItem key={subItem.title} className="flex items-center flex-row">
              <SidebarMenuButton asChild isActive={item.isActive} className="text-md">
                <a href={subItem.url} className="flex items-center gap-2">
                  {subItem.icon && <subItem.icon className="size-10" />}
                  {subItem.title}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        </div>
      ))}
    </SidebarGroup>
  )
}
