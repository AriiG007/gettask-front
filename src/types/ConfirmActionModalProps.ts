export interface ConfirmActionModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onConfirm?: (reason?: string) => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: 'blue' | 'red' | 'gray';
  withReason?: boolean;
  reasonPlaceholder?: string;
}