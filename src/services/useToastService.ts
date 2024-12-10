// toastService.ts
import { toast } from 'sonner';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastMessages {
  pending?: string;
  success?: string;
  error?: string;
}

export const useToastService = () => {

  const showToast = (message: string, type: ToastType = 'success') => {
    toast(message, { type });
  };

  const showPromiseToast = (promise: Promise<any>, messages: ToastMessages = {}) => {
    const defaultMessages = {
      pending: 'Enviando solicitud...',
      success: 'Solicitud exitosa!',
      error: 'Solicitud fallida!',
      ...messages
    };

    toast.promise(promise, {
      loading: defaultMessages.pending,
      success: defaultMessages.success,
      error: defaultMessages.error,
    });
  };

  return {
    showToast,
    showPromiseToast,
  };
};
