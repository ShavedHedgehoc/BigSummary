import { useQueryStates } from 'nuqs';
import { docDetailUiSchema } from '../model';

export function useDocDetailUiParams() {
  const [params, setParams] = useQueryStates(docDetailUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}

export function useLabProductListUiParams() {
  const [params, setParams] = useQueryStates(docDetailUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}

export function useForemanProductListUiParams() {
  const [params, setParams] = useQueryStates(docDetailUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
