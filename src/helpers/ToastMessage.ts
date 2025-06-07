
import { toast } from 'react-toastify';
import type { ToastOptions } from 'react-toastify';

const baseOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
};

export const showSuccessMessage = (msg: string) =>
  toast.success(msg, {
    ...baseOptions,
    className: 'bg-green-600 text-white rounded-md shadow-md'
  });

export const showErrorMessage = (msg: string) =>
  toast.error(msg, {
    ...baseOptions,
    className: 'bg-red-600 text-white rounded-md shadow-md'
  });

export const showInfoMessage = (msg: string) =>
  toast.info(msg, {
    ...baseOptions,
    className: 'bg-blue-500 text-white rounded-md shadow-md'
  });

export const showWarningMessage = (msg: string) =>
  toast.warning(msg, {
    ...baseOptions,
    className: 'bg-yellow-500 text-white rounded-md shadow-md',
  });



