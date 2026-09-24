import { useQueryStates } from 'nuqs';
import { currentDocParamsSchema, docDetailParamsSchema } from '../model';

export function useDocDetailSearchParams() {
  const [params, setParams] = useQueryStates(docDetailParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });
  return { params, setParams };
}

export function useLabProductListSearchParams() {
  const [params, setParams] = useQueryStates(currentDocParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });
  return { params, setParams };
}

export function useForemanProductListSearchParams() {
  const [params, setParams] = useQueryStates(currentDocParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });
  return { params, setParams };
}
