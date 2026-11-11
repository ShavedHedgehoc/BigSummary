import { useQueryStates } from 'nuqs';
import { canDashUiSchema } from './ui-schema';

export function useCanDashUiParams() {
  const [params, setParams] = useQueryStates(canDashUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
