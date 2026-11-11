import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useDeleteConveyor() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.main.conveyor.deleteConveyor.useMutation({
    onSuccess: () => {
      toast.success('Запись успешно удалена');
      return utils.application.main.conveyor.getConveyorList.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при удалении');
    },
  });
  return {
    deleteConveyor: mutation.mutate,
    deleteConveyorAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
