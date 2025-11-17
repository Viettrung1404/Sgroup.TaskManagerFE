import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Plus, MoreVertical, UserPlus, Shield, Archive } from "lucide-react"
import { BoardCard, type BoardCardProps } from "../board-card"
import { InviteUserDialog } from "@/shared/components/modal/invite-user"
import { ManageRolesDialog } from "@/shared/components/modal/manage-roles"
import { ConfirmArchiveWorkspaceDialog } from "@/shared/components/modal/confirm-archive-workspace"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { workspaceService } from "@/shared/api/services/workspaceService"

export interface WorkspaceData {
  id: string
  title: string
  description: string | null
  boardCount: number,
  membersCount: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  members: any[],
  icon: React.ComponentType<{ className?: string }> | string
  boards: BoardCardProps[]
}

export interface WorkspaceListProps {
  workspaces: WorkspaceData[]
  onAddBoard?: (workspaceId: string) => void
  onBoardClick?: (boardId: string, workspaceId: string) => void
  onMembersUpdate?: () => Promise<void>
}

export function WorkspaceList({ workspaces, onAddBoard, onBoardClick, onMembersUpdate }: WorkspaceListProps) {
  const [inviteDialogOpen, setInviteDialogOpen] = useState<string | null>(null);
  const [manageRolesDialogOpen, setManageRolesDialogOpen] = useState<string | null>(null);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState<string | null>(null);
  const [isArchiving, setIsArchiving] = useState(false);

  const handleArchiveWorkspace = async (workspaceId: string) => {
    setIsArchiving(true);
    try {
      const response = await workspaceService.archive(workspaceId);
      
      if (!response.success) {
        console.error('Failed to archive workspace');
        return;
      }

      setArchiveDialogOpen(null);
      
      // Refresh workspaces list
      if (onMembersUpdate) {
        await onMembersUpdate();
      }
    } catch (err) {
      console.error('Error archiving workspace:', err);
    } finally {
      setIsArchiving(false);
    }
  };

  return (
    <div className="space-y-10">
      {workspaces.map((workspace) => (
        <div key={workspace.id} className="space-y-4">
          {/* Workspace Header */}
          <div className="flex items-center justify-between">
            <div className="flex gap-1 flex-col">
              <div className="flex flex-row gap-2">
                <div className="flex h-6 flex-row w-6 items-center justify-center rounded-md bg-blue-600 text-xl text-white">
                  {typeof workspace.icon === 'string' ? (
                    workspace.icon
                  ) : (
                    <workspace.icon className="h-4 w-4" />
                  )}
                </div>
                <a href={`/workspaces/${workspace.id}`} className="text-xl font-semibold hover:text-blue-600">
                  {workspace.title}
                </a>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  {workspace.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {workspace.boardCount} boards
                </p>
              </div>
            </div>
            <div>
                {/* Add Board Button */}
                <Button 
                variant="outline"
                onClick={() => onAddBoard?.(workspace.id)}
                className="mr-2"
                >
                <Plus className="mr-2 h-4 w-4" />
                    Add Board
                </Button>

                {/* Workspace Actions Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => setInviteDialogOpen(workspace.id)}>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Invite Members
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setManageRolesDialogOpen(workspace.id)}>
                      <Shield className="mr-2 h-4 w-4" />
                      Manage Roles
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => setArchiveDialogOpen(workspace.id)}
                      className="text-amber-600 focus:text-amber-600"
                    >
                      <Archive className="mr-2 h-4 w-4" />
                      Archive Workspace
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </div>

          {/* Boards Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {workspace.boards.map((board) => (
              <BoardCard
                key={board.id}
                {...board}
                onClick={() => onBoardClick?.(board.id, workspace.id)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Invite User Dialogs */}
      {workspaces.map((workspace) => (
        <InviteUserDialog
          key={`invite-${workspace.id}`}
          open={inviteDialogOpen === workspace.id}
          onOpenChange={(open) => setInviteDialogOpen(open ? workspace.id : null)}
          workspaceId={workspace.id}
          currentMembers={workspace.members}
          onSuccess={onMembersUpdate}
        />
      ))}

      {/* Manage Roles Dialogs */}
      {workspaces.map((workspace) => (
        <ManageRolesDialog
          key={`roles-${workspace.id}`}
          open={manageRolesDialogOpen === workspace.id}
          onOpenChange={(open) => setManageRolesDialogOpen(open ? workspace.id : null)}
          workspaceId={workspace.id}
          members={workspace.members}
          onSuccess={onMembersUpdate}
        />
      ))}

      {/* Confirm Archive Dialogs */}
      {workspaces.map((workspace) => (
        <ConfirmArchiveWorkspaceDialog
          key={`archive-${workspace.id}`}
          open={archiveDialogOpen === workspace.id}
          onOpenChange={(open) => setArchiveDialogOpen(open ? workspace.id : null)}
          workspaceName={workspace.title}
          onConfirm={() => handleArchiveWorkspace(workspace.id)}
          isLoading={isArchiving}
        />
      ))}
    </div>
  )
}
