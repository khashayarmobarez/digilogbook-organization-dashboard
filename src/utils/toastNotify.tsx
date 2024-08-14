import { toast } from 'react-toastify';

export const showToast = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
  toast(message, {
    type,
    position: 'top-right',
    autoClose: 5000,
    theme: 'dark',
    style: { width: "90%" },
    rtl: true,
  });
};