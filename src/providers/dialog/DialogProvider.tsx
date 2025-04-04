import { ConfirmDialog } from '@/providers/dialog/components/ConfirmDialog';
import { CustomDialog } from '@/providers/dialog/components/CustomDialog';
import { DeleteDialog } from '@/providers/dialog/components/DeleteDialog';
import { DialogContext } from '@/providers/dialog/DialogContext';
import { DialogConfig } from '@/providers/dialog/types';
import { ReactNode, useState } from 'react';

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDialog, setCurrentDialog] = useState<DialogConfig | null>(null);

  const openDialog = (config: DialogConfig) => {
    setCurrentDialog(config);
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setCurrentDialog(null);
  };

  const renderDialog = () => {
    if (!currentDialog) return null;

    switch (currentDialog.type) {
      case 'confirm':
        return <ConfirmDialog config={currentDialog} onClose={closeDialog} />;
      case 'delete':
        return <DeleteDialog config={currentDialog} onClose={closeDialog} />;
      case 'custom':
        return <CustomDialog config={currentDialog} onClose={closeDialog} />;
      default:
        return null;
    }
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, isOpen, currentDialog }}>
      {children}
      {isOpen && renderDialog()}
    </DialogContext.Provider>
  );
};
