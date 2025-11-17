import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { Archive } from 'lucide-react';

interface ConfirmArchiveWorkspaceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workspaceName: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ConfirmArchiveWorkspaceDialog({
  open,
  onOpenChange,
  workspaceName,
  onConfirm,
  isLoading = false,
}: ConfirmArchiveWorkspaceDialogProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5 text-amber-600" />
            Archive Workspace
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to archive this workspace?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="rounded-md bg-amber-50 p-4 space-y-2">
            <p className="text-sm font-medium text-amber-900">
              Workspace: <span className="font-bold">{workspaceName}</span>
            </p>
            <p className="text-sm text-amber-800">
              This workspace will be moved to archived workspaces and can be reopened later.
            </p>
          </div>
          
          <div className="mt-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              When archived:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1 ml-2">
              <li>Workspace will be hidden from active workspaces</li>
              <li>All boards and data will be preserved</li>
              <li>Members can still be part of the workspace</li>
              <li>You can reopen it anytime from archived workspaces</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button 
            type="button" 
            onClick={handleConfirm}
            disabled={isLoading}
            variant="default"
            className="bg-amber-600 hover:bg-amber-700"
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Archiving...
              </>
            ) : (
              <>
                <Archive className="mr-2 h-4 w-4" />
                Archive Workspace
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
