import { trpc } from '@/shared/api';
import { toast } from 'sonner';

export function useCreateEmployee() {
  const utils = trpc.useUtils();
  const mutation = trpc.application.main.employee.createEmployee.useMutation({
    onSuccess: () => {
      toast.success('Сотрудник успешно добавлен');
      utils.application.main.employee.getEmployeeList.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || 'Произошла ошибка при создании');
    },
  });
  return {
    createEmployee: mutation.mutate,
    createEmployeeAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
