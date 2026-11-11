import { useQueryStates } from 'nuqs';
import { userListUiSchema } from './ui-schema';

export function useUserListUiParams() {
  const [params, setParams] = useQueryStates(userListUiSchema, {
    shallow: false,
  });
  return { params, setParams };
}
