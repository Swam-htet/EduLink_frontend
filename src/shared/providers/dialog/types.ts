import { ReactNode } from 'react';

export type DialogType = 'confirm' | 'delete' | 'custom';

export interface DialogConfig {
  title?: string;
  content?: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  showCancel?: boolean;
  confirmText?: string;
  cancelText?: string;
  deleteText?: string;
  type: DialogType;
}

export interface DialogContextType {
  openDialog: (config: DialogConfig) => void;
  closeDialog: () => void;
  isOpen: boolean;
  currentDialog: DialogConfig | null;
}
