import { Users } from './Users';
import { ConfirmActionModal } from '../../components/ConfirmActionModal';
import { useState } from 'react';
import type { User } from '../../types/Task';


const UsersTemplate = () => {
  const { users, loading, canApproveUser, canResetPaaword, approveUser, resetPassword } = Users();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionModal, setActionModal] = useState<'approve' | 'reset-password' | null>(null);

  const openModal = (user: User | null, action: 'approve' | 'reset-password' | null) => {
    setActionModal(action);
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setActionModal(null);
  };


  const handleConfirm = async () => {
    if (actionModal == 'approve')
      await approveUser(selectedUser)
    if (actionModal == 'reset-password')
      await resetPassword(selectedUser)

    closeModal();
  };


  if (loading) return <div className="p-6">Loading...</div>;

  return (

    <div className="w-full h-screen bg-gray-100 flex flex-col">

      <header className="p-4 bg-white shadow flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Users</h1>
      </header>

      <div className="max-h-screen p-4">
        <div className="max-h-[80vh] overflow-y-auto rounded-lg shadow-md bg-white p-4">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left text-black">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Email</th>
                {(canApproveUser) && (
                  <th className="px-4 py-2 font-medium">Approval status</th>
                )}
                {canResetPaaword && (
                  <th className="px-4 py-2 font-medium"></th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>

                  {canApproveUser && (
                    <td className="px-4 py-2">
                      {!user.is_validated ? (
                        <button
                          onClick={() => openModal(user, 'approve')}
                          className="px-3 py-1 text-sm rounded-full bg-blue-500 text-white hover:bg-blue-600 transition curson-pointer"
                        >
                          Approve User
                        </button>
                      ) :
                        <span className="text-teal-600">Approved User</span>
                      }
                    </td>
                  )}

                  {canResetPaaword && (
                    <td className="px-4 py-2">
                      <button
                        onClick={() => openModal(user, 'reset-password')}
                        className="px-3 py-1 text-sm rounded-full bg-yellow-500 text-white hover:bg-yellow-600 transition curson-pointer"
                      >
                        Reset Passord
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {users.length === 0 && (
            <p className="text-center text-gray-500 py-4">No users were found.</p>
          )}
        </div>
      </div>

      <ConfirmActionModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        title={actionModal === 'approve' ? 'Approve User' : 'Resset User Password'}
        message={
          actionModal === 'approve'
            ? 'This action will approve the user for access to the system. Are you sure you want to continue?'
            : 'This action will automatically assign a new password to the user. The new password will be sent to the user by email. Are you sure you want to continue?'
        }
        confirmLabel="Confirm"
        cancelLabel="Cancel"
      />


    </div>

  );
};

export default UsersTemplate;
