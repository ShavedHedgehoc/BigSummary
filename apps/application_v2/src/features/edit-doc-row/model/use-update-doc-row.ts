import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useUpdateDocRow() {
  const utils = trpc.useUtils();

  const mutation = trpc.application.main.doc.updateDocRow.useMutation({
    onSuccess: () => {
      toast.success('Запись успешно обгновлена');
      utils.application.main.doc.getDetail.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при удалении');
    },
  });
  return {
    updateDocRow: mutation.mutate,
    updateDocRowAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
