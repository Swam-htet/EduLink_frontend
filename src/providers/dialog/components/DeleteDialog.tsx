import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { DialogConfig } from '@/providers/dialog/types';

interface DeleteDialogProps {
  config: DialogConfig;
  onClose: () => void;
}

export const DeleteDialog = ({ config, onClose }: DeleteDialogProps) => {
  const handleDelete = () => {
    config.onDelete?.();
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{config.title || 'Confirm Delete'}</DialogTitle>
        <div>{config.content}</div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            {config.cancelText || 'Cancel'}
          </Button>
          <Button onClick={handleDelete} variant="destructive">
            {config.deleteText || 'Delete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
