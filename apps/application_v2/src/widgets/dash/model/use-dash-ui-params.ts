import { useQueryStates } from 'nuqs';
import { dashUiSchema } from './ui-schema';

export function useDashUiParams() {
  const [params, setParams] = useQueryStates(dashUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
