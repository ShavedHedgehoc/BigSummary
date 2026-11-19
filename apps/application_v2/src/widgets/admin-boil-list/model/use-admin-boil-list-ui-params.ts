import { useQueryStates } from 'nuqs';
import { adminBoilListUiSchema } from './ui-schema';

export function useAdminBoilListUiParams() {
  const [params, setParams] = useQueryStates(adminBoilListUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
