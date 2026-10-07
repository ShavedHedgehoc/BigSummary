import { useQueryStates } from 'nuqs';
import { docDetailUiSchema } from './ui-schema';

export function useDocDetailUiParams() {
  const [params, setParams] = useQueryStates(docDetailUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
