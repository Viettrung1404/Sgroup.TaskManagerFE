import { useState, useEffect } from 'react';
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
import type { Workspace } from '@/shared/types';
import { Archive, RotateCcw } from 'lucide-react';

interface ArchivedWorkspacesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => Promise<void>;
}

export function ArchivedWorkspacesDialog({ 
  open, 
  onOpenChange, 
  onSuccess 
}: ArchivedWorkspacesDialogProps) {
  const [archivedWorkspaces, setArchivedWorkspaces] = useState<Workspace[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reopeningId, setReopeningId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      fetchArchivedWorkspaces();
    }
  }, [open]);

  const fetchArchivedWorkspaces = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await workspaceService.getArchived();
      if (response.success && response.responseObject) {
        setArchivedWorkspaces(response.responseObject);
      } else {
        setError('Failed to load archived workspaces');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load archived workspaces');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReopen = async (workspaceId: string) => {
    setReopeningId(workspaceId);
    setError(null);
    
    try {
      const response = await workspaceService.reopen(workspaceId);
      
      if (!response.success) {
        setError(response.message || 'Failed to reopen workspace');
        return;
      }

      // Remove from list
      setArchivedWorkspaces(prev => prev.filter(ws => ws.id !== workspaceId));
      
      // Refresh parent list
      if (onSuccess) {
        await onSuccess();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reopen workspace');
    } finally {
      setReopeningId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5" />
            Archived Workspaces
          </DialogTitle>
          <DialogDescription>
            View and restore your archived workspaces.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {error && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="mb-2 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 mx-auto"></div>
                <p className="text-sm text-muted-foreground">Loading...</p>
              </div>
            </div>
          ) : archivedWorkspaces.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Archive className="h-12 w-12 text-gray-400 mb-3" />
              <p className="text-sm text-muted-foreground">
                No archived workspaces found
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Archived workspaces will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <Label className="text-base">
                {archivedWorkspaces.length} Archived Workspace{archivedWorkspaces.length !== 1 ? 's' : ''}
              </Label>
              <div className="max-h-[400px] overflow-y-auto space-y-2">
                {archivedWorkspaces.map((workspace) => (
                  <div 
                    key={workspace.id} 
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-semibold truncate">
                          {workspace.title}
                        </h4>
                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                          Archived
                        </span>
                      </div>
                      {workspace.description && (
                        <p className="text-xs text-muted-foreground truncate mb-2">
                          {workspace.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{workspace.boards?.length || 0} boards</span>
                        <span>{workspace.members?.length || 0} members</span>
                        <span className="capitalize">{workspace.visibility}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleReopen(workspace.id)}
                      disabled={reopeningId === workspace.id}
                      className="ml-4"
                    >
                      {reopeningId === workspace.id ? (
                        <>
                          <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                          Reopening...
                        </>
                      ) : (
                        <>
                          <RotateCcw className="mr-2 h-3 w-3" />
                          Reopen
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
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
  );
}
