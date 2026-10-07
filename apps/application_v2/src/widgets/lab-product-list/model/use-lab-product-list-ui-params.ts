import { useQueryStates } from 'nuqs';
import { labProductListUiSchema } from './ui-schema';

export function useLabProductListUiParams() {
  const [params, setParams] = useQueryStates(labProductListUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
