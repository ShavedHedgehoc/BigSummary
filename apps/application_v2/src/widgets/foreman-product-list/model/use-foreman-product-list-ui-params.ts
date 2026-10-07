import { useQueryStates } from 'nuqs';
import { foremanProductListUiSchema } from './ui-schema';

export function useForemanProductListUiParams() {
  const [params, setParams] = useQueryStates(foremanProductListUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
