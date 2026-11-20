import { useQueryStates } from 'nuqs';
import { employeeListUiSchema } from './ui-schema';

export function useEmployeeListUiParams() {
  const [params, setParams] = useQueryStates(employeeListUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
