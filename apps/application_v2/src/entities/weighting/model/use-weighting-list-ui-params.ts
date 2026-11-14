import { useQueryStates } from 'nuqs';
import { traceWeightingListUiSchema } from './ui-schema';

export function useWeightingListUiParams() {
  const [params, setParams] = useQueryStates(traceWeightingListUiSchema, {
    shallow: true,
  });
  return { params, setParams };
}
