import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useUpdateBases() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.main.base.bulkUpdateBases.useMutation({
    onSuccess: () => {
      toast.success('Данные загружены');
      utils.application.main.boil.getBoilList.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при загрузке');
    },
  });
  return {
    updateBases: mutation.mutate,
    updateBasesAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
