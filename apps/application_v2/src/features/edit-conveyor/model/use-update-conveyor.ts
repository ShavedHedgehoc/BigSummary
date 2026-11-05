import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useUpdateConveyor() {
  const utils = trpc.useUtils();

  const mutation = trpc.application.main.conveyor.updateConveyor.useMutation({
    onSuccess: () => {
      toast.success('Запись успешно обновлена');
      utils.application.main.conveyor.getConveyorList.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при удалении');
    },
  });
  return {
    updateConveyor: mutation.mutate,
    updateConveyorAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
