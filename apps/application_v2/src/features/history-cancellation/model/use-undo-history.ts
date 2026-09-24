import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useUndoHistory() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.main.history.directCreateHistory.useMutation({
    onSuccess: () => {
      toast.success('Запись отменена');
      utils.application.main.doc.getCurrentDoc.invalidate();
      utils.application.main.boil.getBoilList.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при отмене');
    },
  });
  return {
    undoHistory: mutation.mutate,
    undoHistoryAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
