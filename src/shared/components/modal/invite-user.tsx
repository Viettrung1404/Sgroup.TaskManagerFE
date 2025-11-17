import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { workspaceService } from '@/shared/api/services/workspaceService';
import type { WorkspaceMember } from '@/shared/types';

interface InviteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceId: string;
  currentMembers: WorkspaceMember[];
  onSuccess?: () => Promise<void>;
}

export function InviteUserDialog({ 
  open, 
  onOpenChange, 
  workspaceId, 
  currentMembers,
  onSuccess 
}: InviteUserDialogProps) {
  const [email, setEmail] = useState('');
  const [roleName, setRoleName] = useState<'workspace_member' | 'workspace_moderator'>('workspace_member');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    setError(null);

    try {
      // Tìm user theo email (giả sử có API này, hoặc backend sẽ handle)
      const response = await workspaceService.inviteByEmail(workspaceId, {
        email: email.trim(),
        roleName,
      });
      
      if (!response.success) {
        setError(response.message || "Failed to invite user");
        return;
      }

      setEmail('');
      setRoleName('workspace_member');
    //   onOpenChange(false);
      
      // Refresh members list after closing modal
      if (onSuccess) {
        await onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to invite user");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Invite User to Workspace</DialogTitle>
          <DialogDescription>
            Send an invitation to a user by entering their email address.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {error && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
                {error}
              </div>
            )}
            
            <div className="grid gap-2">
              <Label htmlFor="email">User Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user email"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <select
                title="role"
                id="role"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value as 'workspace_member' | 'workspace_moderator')}
                disabled={isSubmitting}
              >
                <option value="workspace_member">Member - Can view and edit boards</option>
                <option value="workspace_moderator">Moderator - Can manage workspace and members</option>
              </select>
            </div>

            {/* Current Members Section */}
            <div className="mt-4">
              <Label className="mb-2 block">Current Members ({currentMembers.length})</Label>
              <div className="max-h-[200px] overflow-y-auto rounded-md border border-gray-200 p-3">
                {currentMembers.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No members yet</p>
                ) : (
                  <div className="space-y-2">
                    {currentMembers.map((member) => (
                      <div 
                        key={member.id} 
                        className="flex items-center justify-between rounded-md bg-gray-50 p-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-medium text-white">
                            {member.username?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-medium">{member.username}</p>
                            <p className="text-xs text-muted-foreground">{member.email}</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                          {member.role.name.split('_').join(' ').toLocaleUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!email.trim() || isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Invitation'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
