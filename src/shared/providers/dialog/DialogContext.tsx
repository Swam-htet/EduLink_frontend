import { DialogContextType } from '@/shared/providers/dialog/types';
import { createContext, useContext } from 'react';

export const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialogContext must be used within a DialogProvider');
  }
  return context;
};
