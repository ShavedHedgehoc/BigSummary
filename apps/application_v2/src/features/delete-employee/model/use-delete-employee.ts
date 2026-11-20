import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useDeleteEmployee() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.main.employee.deleteEmployee.useMutation({
    onSuccess: () => {
      toast.success('Запись успешно удалена');
      return utils.application.main.employee.getEmployeeList.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при удалении');
    },
  });
  return {
    deleteEmployee: mutation.mutate,
    deleteEmployeeAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
