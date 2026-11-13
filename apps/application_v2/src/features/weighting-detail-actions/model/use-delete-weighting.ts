import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useDeleteWeighting() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.trace.weighting.deleteWeighting.useMutation({
    onSuccess: () => {
      toast.success('Запись успешно удалена');
      utils.application.trace.weighting.getWeightingList.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при удалении');
    },
  });
  return {
    deleteWeighting: mutation.mutate,
    deleteWeightingAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
