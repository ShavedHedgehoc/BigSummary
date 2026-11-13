import { useQueryStates } from 'nuqs';
import { traceWeightingListUiSchema } from './ui-schema';

export function useWeightingListUiParams() {
  const [params, setParams] = useQueryStates(traceWeightingListUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
