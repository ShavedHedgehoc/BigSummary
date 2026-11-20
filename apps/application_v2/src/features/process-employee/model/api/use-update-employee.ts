import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useUpdateEmployee() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.main.employee.updateEmployee.useMutation({
    onSuccess: () => {
      toast.success('Данные сотрудника успешно обновлены');
      utils.application.main.employee.getEmployeeList.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при обновлении данных');
    },
  });
  return {
    updateEmployee: mutation.mutate,
    updateEmployeeAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
