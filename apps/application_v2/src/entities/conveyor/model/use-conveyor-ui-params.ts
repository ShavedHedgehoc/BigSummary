import { useQueryStates } from 'nuqs';
import { conveyorListUiSchema } from './ui-schema';

export function useConveyorListUiParams() {
  const [params, setParams] = useQueryStates(conveyorListUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
