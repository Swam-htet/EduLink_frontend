import { useDialogContext } from '@/shared/providers/dialog/DialogContext';
import type { DialogConfig } from '@/shared/providers/dialog/types';

export const useDialog = () => {
  const { openDialog, closeDialog, isOpen } = useDialogContext();

  const confirm = (config: Omit<DialogConfig, 'type'>) => {
    openDialog({ ...config, type: 'confirm' });
  };

  const confirmDelete = (config: Omit<DialogConfig, 'type'>) => {
    openDialog({ ...config, type: 'delete' });
  };

  const custom = (config: Omit<DialogConfig, 'type'>) => {
    openDialog({ ...config, type: 'custom' });
  };

  return {
    confirm,
    confirmDelete,
    custom,
    close: closeDialog,
    isOpen
  };
};
