import { useEffect, useState } from "react"
import { Button } from "@/shared/ui/button"
import { Plus, Kanban } from "lucide-react"
import { useDashboardTitle, WorkspaceList } from "@/features/dashboard"
import { useDashboard } from "@/features/dashboard/context"
import { CreateWorkspaceDialog } from "@/shared/components/modal/create-workspace"

export default function WorkspacePage() {
  const { setTitle } = useDashboardTitle()
  const { workspaces, refreshWorkspaces } = useDashboard()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const props = workspaces.map(ws => ({
    id: ws.id,
    title: ws.title,
    description: ws.description,
    boardCount: ws.boards.length,
    boards: ws.boards.map(board => ({
      id: board.id,
      title: board.title,
      description: board.description,
    })),
    icon: Kanban
  }))

  useEffect(() => {
    setTitle("Dashboard")
  }, [setTitle])

  const handleAddWorkspace = () => {
    setIsCreateDialogOpen(true)
  }

  const handleAddBoard = (workspaceId: string) => {
    console.log("Add board to workspace:", workspaceId)
  }

  const handleBoardClick = (boardId: string, workspaceId: string) => {
    console.log("Open board:", boardId, "from workspace:", workspaceId)
  }

  return (
    <>
      <CreateWorkspaceDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={refreshWorkspaces}
      />
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground mt-1">
            Manage your workspaces and boards
          </p>
        </div>
        <Button size="lg" onClick={handleAddWorkspace}>
          <Plus className="mr-2 h-4 w-4" />
          New Workspace
        </Button>
      </div>

      {/* Workspaces List */}
      <WorkspaceList
        workspaces={props}
        onAddBoard={handleAddBoard}
        onBoardClick={handleBoardClick}
      />
    </>
  )
}
