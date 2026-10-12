import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useChangeUserAccess() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.main.user.changeUserAccess.useMutation({
    onSuccess: () => {
      toast.success('Доступ успешно обновлен');
      utils.application.main.user.getUserList.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при изменении доступа');
    },
  });
  return {
    changeUserAccess: mutation.mutate,
    changeUserAccessAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
