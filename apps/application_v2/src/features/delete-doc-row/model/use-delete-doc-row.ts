import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useDeleteDocRow() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.main.doc.deleteDocRow.useMutation({
    onSuccess: () => {
      toast.success('Запись успешно удалена');
      utils.application.main.doc.getDetail.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при удалении');
    },
  });
  return {
    deleteDocRow: mutation.mutate,
    deleteDocRowAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
