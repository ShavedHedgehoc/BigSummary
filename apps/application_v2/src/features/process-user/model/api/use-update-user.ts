import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useUpdateUser() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.main.user.updateUser.useMutation({
    onSuccess: () => {
      toast.success('Данные пользователя успешно обновлен');
      utils.application.main.user.getUserList.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при обновлении данных');
    },
  });
  return {
    updateUser: mutation.mutate,
    updateUserAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
