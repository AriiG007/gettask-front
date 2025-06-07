import { Fragment, useState } from 'react';
import type { ConfirmActionModalProps } from '../types/ConfirmActionModalProps';
import { Transition, Dialog, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';

export const ConfirmActionModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmColor = 'blue',
  withReason = false,
  reasonPlaceholder = 'Reason of the acction',
}: ConfirmActionModalProps) => {
  const [reason, setReason] = useState('');

  const confirmBtnColor = {
    blue: 'bg-blue-600 hover:bg-blue-700 text-white',
    red: 'bg-red-600 hover:bg-red-700 text-white',
    gray: 'bg-gray-600 hover:bg-gray-700 text-white',
  }[confirmColor] || 'bg-blue-600 hover:bg-blue-700 text-white';

  const handleConfirm = () => {
    onConfirm(withReason ? reason : undefined);
    setReason('');
    onClose();
  };

  const handleCancel = () => {
    setReason('');
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCancel}>
        <TransitionChild
          as={Fragment}
          enter="transition-opacity ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <TransitionChild
            as={Fragment}
            enter="transition ease-out duration-300 transform"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-200 transform"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full max-w-md rounded bg-white p-6 shadow-xl">
              <DialogTitle className="text-lg font-medium text-gray-800">
                {title}
              </DialogTitle>

              <div className="mt-4 text-sm text-gray-600">{message}</div>

              {withReason && (
                <div className="mt-4">
                  <label
                    htmlFor="reason"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Reason for this action
                  </label>
                  <textarea
                    id="reason"
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                    rows={3}
                    className="mt-1 w-full rounded border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder={reasonPlaceholder}
                  />
                </div>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={handleConfirm}
                  className={`px-3 py-1 text-sm rounded ${confirmBtnColor}`}
                >
                  {confirmLabel}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};