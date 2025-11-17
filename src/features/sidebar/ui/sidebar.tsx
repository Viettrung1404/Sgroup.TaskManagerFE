"use client"

import {
  Kanban,
  LayoutDashboard
} from "lucide-react"

import { NavMain } from "./sidebar-main"
import { NavUser } from "./sidebar-user"
import { TeamSwitcher } from "./sidebar-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/shared/ui/sidebar"

import { useDashboard } from "@/features/dashboard/context"
import { useMemo } from "react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { workspaces } = useDashboard()

  // Create navMain with Navigation and Workspaces from hook
  const navMain = useMemo(() => [
    {
      title: "Navigation",
      url: "/dashboard",
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
      ],
    },
    {
      title: "Workspaces",
      url: "/workspaces",
      items: workspaces.map((workspace) => ({
        title: workspace.title,
        url: `/workspaces/${workspace.id}`,
        icon: Kanban,
      })),
    }
  ], [workspaces])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher 
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
