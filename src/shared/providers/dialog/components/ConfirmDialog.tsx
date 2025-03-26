import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { DialogConfig } from '@/shared/providers/dialog/types';

interface ConfirmDialogProps {
  config: DialogConfig;
  onClose: () => void;
}

export const ConfirmDialog = ({ config, onClose }: ConfirmDialogProps) => {
  const handleConfirm = () => {
    config.onConfirm?.();
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>{config.title}</DialogTitle>
        <div>{config.content}</div>
        <div className="mt-4 flex justify-end gap-2">
          {config.showCancel && (
            <Button variant="outline" onClick={onClose}>
              {config.cancelText || 'Cancel'}
            </Button>
          )}
          <Button onClick={handleConfirm}>{config.confirmText || 'Confirm'}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
