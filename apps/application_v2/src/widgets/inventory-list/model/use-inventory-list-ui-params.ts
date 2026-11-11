import { useQueryStates } from 'nuqs';
import { inventoryListUiSchema } from './ui-schema';

export function useInventoryListUiParams() {
  const [params, setParams] = useQueryStates(inventoryListUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
