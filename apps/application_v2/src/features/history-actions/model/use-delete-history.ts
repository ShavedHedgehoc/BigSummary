import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useDeleteHistory() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.main.history.deleteHistory.useMutation({
    onSuccess: () => {
      toast.success('Запись успешно удалена');
      utils.application.main.doc.getDetail.invalidate();
      utils.application.main.boil.getBoilList.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при удалении');
    },
  });
  return {
    deleteHistory: mutation.mutate,
    deleteHistoryAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
