import { useQueryStates } from 'nuqs';
import { docListUiSchema } from './ui-schema';

export function useDocListUiParams() {
  const [params, setParams] = useQueryStates(docListUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
