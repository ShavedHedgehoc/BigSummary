import { trpc } from '@/shared/api';
import { useIsMobile } from '@/shared/lib';
import { keepPreviousData } from '@tanstack/react-query';
import { useMemo } from 'react';
import { userListColumns } from '../ui/columns';
import { ITablePaginationProps } from '@/shared/ui';
import { useUserListSearchParams } from '@/entities/user/lib';
import { UserListParams } from '@/entities/user/index.server';
import { useUserListUiParams } from './use-user-list-ui-params';

export function useUserList() {
  const isMobile = useIsMobile();

  const { params, setParams } = useUserListSearchParams();
  const { params: uiParams, setParams: setUiParams } = useUserListUiParams();

  const { data: roleData } = trpc.application.main.role.getRoleList.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  const { data, isLoading } = trpc.application.main.user.getUserList.useQuery(params, {
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });

  const columns = useMemo(() => {
    const base = [...userListColumns];
    return base.filter((col) => (isMobile ? !col.meta?.hideOnMobile : !col.meta?.hideOnDesktop));
  }, [isMobile]);

  const hasSelectedRow = uiParams.selectedUserId !== '';
  const targetId = uiParams.selectedUserId ? Number(uiParams.selectedUserId) : null;
  const selectedRow =
    data?.rows && targetId ? data.rows.find((row) => row.id === targetId) : undefined;

  const clearSelected = () => setUiParams({ selectedUserId: '' });

  const paginationProps: ITablePaginationProps<UserListParams> = {
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    params: params,
    setParams: setParams,
    onClearSelection: clearSelected,
  };

  return {
    params,
    setParams,
    setUiParams,
    data,
    roleData,
    isLoading,
    columns,
    hasSelectedRow,
    selectedRow,
    clearSelected,
    isMobile,
    paginationProps,
  };
}
