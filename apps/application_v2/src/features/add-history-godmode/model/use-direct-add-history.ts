import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useDirectAddHistory() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.main.history.directCreateHistory.useMutation({
    onSuccess: () => {
      toast.success('Запись добавлена');
      utils.application.main.doc.getDetail.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при создании');
    },
  });
  return {
    directAddHistory: mutation.mutate,
    directAddHistoryAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
