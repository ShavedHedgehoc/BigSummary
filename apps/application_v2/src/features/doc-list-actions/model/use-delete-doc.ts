import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useDeleteDoc() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.main.doc.deleteDoc.useMutation({
    onSuccess: () => {
      toast.success('Запись успешно удалена');
      utils.application.main.doc.getDocList.invalidate();
      utils.application.main.doc.getStats.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при удалении');
    },
  });
  return {
    deleteDoc: mutation.mutate,
    deleteDocAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
