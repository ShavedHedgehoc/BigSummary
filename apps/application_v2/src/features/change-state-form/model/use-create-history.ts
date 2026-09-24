import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useCreateHistory() {
  const utils = trpc.useUtils();

  const mutation = trpc.application.main.history.createHistory.useMutation({
    onSuccess: () => {
      toast.success('Запись успешно создана');
      utils.application.main.boil.getBoilList.invalidate();
      utils.application.main.doc.getCurrentDoc.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при создании');
    },
  });
  return {
    createHistory: mutation.mutate,
    createHistoryAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
