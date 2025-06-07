import { useEffect, useState } from 'react';
import api from '../../api/axios';
import type { User } from '../../types/User';
import { showErrorMessage, showSuccessMessage } from '../../helpers/ToastMessage';
import { validatePermission } from '../../services/auth/Auth';

export const Users = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const canApproveUser = validatePermission('approve.users');
  const canResetPaaword = validatePermission('reset.password.users');

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {

    setLoading(true);

    try {

      const usersrsReq = await api.get<User[]>(`/users`);
      const users = Array.isArray(usersrsReq.data) ? usersrsReq.data : [];
      setUsers(users)


    } catch (error) {
      console.error('Error loading data:', error);
      showErrorMessage(
        'An error occurred while loading data. ' +
        'Please reload the page. If the problem persists, please contact the administrator.'
      );
    } finally {
      setLoading(false);
    }
  }


  const approveUser = async (user: User) => {
    try {
      await api.post(`/users/${user.id}/approve`);
      await fetchData();
      showSuccessMessage('User has been successfully approved.');
    } catch (error) {
      console.error(error);
      showErrorMessage('The user could not be approved.');
    }
  }


  const resetPassword = async (user: User) => {
    try {
      await api.post(`/users/${user.id}/reset-password`);
      await fetchData();
      showSuccessMessage("The user's password was successfully reset.");
    } catch (error) {
      console.error(error);
      showErrorMessage("The user's password could not be reset.");
    }
  }


  return { users, loading, canApproveUser, canResetPaaword, approveUser, resetPassword };
};