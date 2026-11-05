import { docDetailUiSchema } from '@/entities/doc';
import { useQueryStates } from 'nuqs';

export function useDocDetailUiParams() {
  const [params, setParams] = useQueryStates(docDetailUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
