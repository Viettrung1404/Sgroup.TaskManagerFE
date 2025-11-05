"use client"

import * as React from "react"
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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: Kanban,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: Kanban,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Kanban,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "All Boards",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
