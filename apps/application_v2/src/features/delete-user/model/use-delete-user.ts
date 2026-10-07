import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useDeleteUser() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.main.user.deleteUser.useMutation({
    onSuccess: () => {
      toast.success('Запись успешно удалена');
      utils.application.main.user.getUserList.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при удалении');
    },
  });
  return {
    deleteUser: mutation.mutate,
    deleteUserAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
