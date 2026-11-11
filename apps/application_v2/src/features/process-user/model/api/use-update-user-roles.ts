import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useUpdateUserRoles() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.main.user.updateUserRoles.useMutation({
    onSuccess: () => {
      toast.success('Роли успешно обновлены');
      utils.application.main.user.getUserList.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при обновлении ролей');
    },
  });
  return {
    updateUserRoles: mutation.mutate,
    updateUserRolesAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
