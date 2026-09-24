import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useUploadDocData() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.main.doc.uploadData.useMutation({
    onSuccess: () => {
      toast.success('Данные загружены');
      utils.application.main.doc.getDocList.invalidate();
      utils.application.main.doc.getStats.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при удалении');
    },
  });
  return {
    uploadDocData: mutation.mutate,
    uploadDocDataAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
