import { useQueryStates } from 'nuqs';
import { labBoilListUiSchema } from '../model';

export function useLabBoilListUiParams() {
  const [params, setParams] = useQueryStates(labBoilListUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
