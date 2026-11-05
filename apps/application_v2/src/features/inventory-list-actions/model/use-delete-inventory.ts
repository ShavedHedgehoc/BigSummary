import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useDeleteInventory() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.trace.inventory.deleteInventory.useMutation({
    onSuccess: () => {
      toast.success('Запись успешно удалена');
      utils.application.trace.inventory.getInventoryList.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при удалении');
    },
  });
  return {
    deleteInventory: mutation.mutate,
    deleteInventoryAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
