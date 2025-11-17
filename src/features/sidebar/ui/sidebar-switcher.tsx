"use client"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/shared/ui/sidebar"
import { Kanban } from "lucide-react"

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="group p-3 pl-5 flex items-center gap-2">
        <div className="text-sidebar-primary-foreground flex size-9  items-center justify-center rounded-lg bg-blue-600">
                <Kanban className="size-6" />
        </div>
        <div className="grid flex-1 text-left text-md leading-tight">
          <span className="font-bold text-2xl">Trello</span>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
