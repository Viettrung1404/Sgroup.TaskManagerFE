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

import type { Workspace } from "@/shared/types"
import { useEffect, useState } from "react"
import { workspaceService } from "@/shared/api/services/workspaceService"

interface WorkspaceWithLogo extends Workspace {
  logo: React.ElementType
}

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      title: "Acme Inc",
      logo: Kanban,
      description: "Enterprise",
    },
    {
      title: "Acme Corp.",
      logo: Kanban,
      description: "Startup",
    },
    {
      title: "Evil Corp.",
      logo: Kanban,
      description: "Free",
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
  // Call api lấy dữ liệu của workspace, board, user ở đây
  const [workspaces, setWorkspaces] = useState<WorkspaceWithLogo[]>([])

  useEffect(() => {
    let isMounted = true; // ✅ Prevent state update if unmounted

    async function fetchWorkspaces() {
      try {
        const response = await workspaceService.getAll();
        console.log('Fetched workspaces:', response);
        
        if (isMounted) {
          const workspacesData = response.responseObject.map((workspace) => ({
            ...workspace,
            logo: Kanban,
          }))
          setWorkspaces(workspacesData)
        }
      } catch (error) {
        console.error('Failed to fetch workspaces:', error);
      }
    }

    fetchWorkspaces();

    // ✅ Cleanup function
    return () => {
      isMounted = false;
    };
  }, []); // ✅ Empty deps - only run once

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={workspaces} />
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
