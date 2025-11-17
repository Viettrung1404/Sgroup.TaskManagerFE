import { Button } from '@/shared/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';

interface ConfirmRoleChangeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberName: string;
  currentRole: string;
  newRole: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ConfirmRoleChangeDialog({
  open,
  onOpenChange,
  memberName,
  currentRole,
  newRole,
  onConfirm,
  isLoading = false,
}: ConfirmRoleChangeDialogProps) {
  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Role Change</DialogTitle>
          <DialogDescription>
            Are you sure you want to change the role for this member?
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="rounded-md bg-amber-50 p-4 space-y-2">
            <p className="text-sm font-medium text-amber-900">
              Member: <span className="font-bold">{memberName}</span>
            </p>
            <p className="text-sm text-amber-800">
              Current Role: <span className="font-semibold">{currentRole}</span>
            </p>
            <p className="text-sm text-amber-800">
              New Role: <span className="font-semibold">{newRole}</span>
            </p>
          </div>
          
          <p className="mt-4 text-sm text-muted-foreground">
            This will update the member's permissions immediately.
          </p>
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
          >
            {isLoading ? 'Updating...' : 'Confirm Change'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
