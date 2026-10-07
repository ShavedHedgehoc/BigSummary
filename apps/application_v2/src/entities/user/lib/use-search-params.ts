import { useQueryStates } from 'nuqs';
import { userListParamsSchema } from '../index.server';

export function useUserListSearchParams() {
  const [params, setParams] = useQueryStates(userListParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });
  return { params, setParams };
}
