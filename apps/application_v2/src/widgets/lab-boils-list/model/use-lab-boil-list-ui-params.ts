import { useQueryStates } from 'nuqs';
import { labBoilListUiSchema } from './ui-schema';

export function useLabBoilListUiParams() {
  const [params, setParams] = useQueryStates(labBoilListUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
