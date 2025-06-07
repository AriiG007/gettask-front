import { Fragment, useState, useEffect } from "react";
import {
  Transition,
  Dialog,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { User } from "../../../../types/User";
import {
  showErrorMessage,
  showInfoMessage,
} from "../../../../helpers/ToastMessage";
import api from "../../../../api/axios";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onConfirm?: (userId: string) => void;
}

export const SelectUserModal = ({ isOpen, onClose, onConfirm }: ModalProps) => {
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (isOpen && users.length === 0) {
      getUsers();
    }
  }, [isOpen]);

  const getUsers = async () => {
    try {
      if (!users.length) {
        const usersrsReq = await api.get<User[]>(`/users`);
        const users = Array.isArray(usersrsReq.data) ? usersrsReq.data : [];
        setUsers(users);
      }
    } catch (error) {
      console.error(error);
      showErrorMessage(
        "An error occurred while loading users try again, If the problem persists, please contact the administrator."
      );
    }
  };

  const handleConfirm = () => {
    if (!userId.length) {
      showInfoMessage("Select a user before confirming the assignment ");
      return;
    }

    onConfirm(userId);
    setUserId("");
    onClose();
  };

  const handleCancel = () => {
    setUserId("");
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
                Reassign Task To User
              </DialogTitle>

              <div className="mt-4 text-sm text-gray-600">
                Select the user to assign task
              </div>

              <div className="mt-4">
                <select
                  id="customSelect"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full rounded-md border px-4 py-2 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an option</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
                >
                  Cancell
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-3 py-1 text-sm rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Confirm task asssignment
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
};
