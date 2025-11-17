import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Label } from '@/shared/ui/label';
import { workspaceService } from '@/shared/api/services/workspaceService';
import type { WorkspaceMember } from '@/shared/types';
import { ConfirmRoleChangeDialog } from './confirm-role-change';

interface ManageRolesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: string;
  members: WorkspaceMember[];
  onSuccess?: () => Promise<void>;
}

interface RoleChangeRequest {
  memberId: string;
  memberName: string;
  currentRole: string;
  newRole: string;
}

export function ManageRolesDialog({ 
  open, 
  onOpenChange, 
  workspaceId,
  members,
  onSuccess 
}: ManageRolesDialogProps) {
  const [pendingChange, setPendingChange] = useState<RoleChangeRequest | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const availableRoles = [
    { value: 'workspace_admin', label: 'Admin - Full control' },
    { value: 'workspace_moderator', label: 'Moderator - Manage workspace and members' },
    { value: 'workspace_member', label: 'Member - View and edit boards' },
  ];

  // Helper function to format role name for display (remove workspace_ prefix)
  const formatRoleDisplay = (roleName: string) => {
    return roleName.replace(/^workspace_/i, '');
  };

  const handleRoleChange = (member: WorkspaceMember, newRole: string) => {
    if (newRole === member.role.name) return;

    setPendingChange({
      memberId: member.id,
      memberName: member.username,
      currentRole: member.role.name,
      newRole,
    });
  };

  const handleConfirmRoleChange = async () => {
    if (!pendingChange) return;

    setIsUpdating(true);
    setError(null);

    try {
      console.log('Updating role for member:', pendingChange);
      const response = await workspaceService.updateMemberRole(
        workspaceId,
        pendingChange.memberId,
        pendingChange.newRole
      );

      if (!response.success) {
        setError(response.message || "Failed to update role");
        return;
      }

      setPendingChange(null);
      
      // Refresh members list
      if (onSuccess) {
        await onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update role");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Manage Member Roles</DialogTitle>
            <DialogDescription>
              Update roles for workspace members. Changes will take effect immediately.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            {error && (
              <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <Label className="mb-3 block text-base">
              Members ({members.length})
            </Label>

            <div className="max-h-[400px] overflow-y-auto space-y-3">
              {members.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No members in this workspace
                </p>
              ) : (
                members.map((member) => (
                  <div 
                    key={member.id} 
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-medium">
                        {member.username?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {member.username}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {member.email} • <span className="capitalize">{formatRoleDisplay(member.role.name)}</span>
                        </p>
                      </div>
                    </div>

                    <div className="ml-4 w-[200px]">
                      <select
                        title={`role-${member.id}`}
                        className="w-full rounded-md border border-gray-300 bg-white py-2 px-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        value={member.role.name}
                        onChange={(e) => handleRoleChange(member, e.target.value)}
                        disabled={isUpdating}
                      >
                        {availableRoles.map((role) => (
                          <option key={role.value} value={role.value}>
                            {role.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirm Role Change Dialog */}
      {pendingChange && (
        <ConfirmRoleChangeDialog
          open={!!pendingChange}
          onOpenChange={(open) => !open && setPendingChange(null)}
          memberName={pendingChange.memberName}
          currentRole={formatRoleDisplay(pendingChange.currentRole)}
          newRole={formatRoleDisplay(pendingChange.newRole)}
          onConfirm={handleConfirmRoleChange}
          isLoading={isUpdating}
        />
      )}
    </>
  );
}
