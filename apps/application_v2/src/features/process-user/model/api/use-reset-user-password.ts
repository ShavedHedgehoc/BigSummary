import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useResetUserPassword() {
  const mutation = trpc.application.main.user.resetUserPassword.useMutation({
    onSuccess: () => {
      toast.success('Пароль успешно сброшен');
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при сбросе пароля');
    },
  });
  return {
    resetUserPassword: mutation.mutate,
    resetUserPasswordAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
