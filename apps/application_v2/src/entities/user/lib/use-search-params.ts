'use client';
import { useQueryStates } from 'nuqs';
import { userListParamsSchema } from '../index.server';
import { trpc } from '@/shared/api';
import { keepPreviousData } from '@tanstack/react-query';

export function useUserListSearchParams() {
  const { data: roleData } = trpc.application.main.role.getRoleList.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });
  const [params, setParams] = useQueryStates(userListParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });
  const { data: userListData, isLoading } = trpc.application.main.user.getUserList.useQuery(
    params,
    {
      placeholderData: keepPreviousData,
      staleTime: 30 * 1000,
    },
  );
  return { roleData, userListData, isLoading, params, setParams };
}
