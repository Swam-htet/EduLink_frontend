import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogConfig } from '@/shared/providers/dialog/types';

interface CustomDialogProps {
  config: DialogConfig;
  onClose: () => void;
}

export const CustomDialog = ({ config, onClose }: CustomDialogProps) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>{config.content}</DialogContent>
    </Dialog>
  );
};
