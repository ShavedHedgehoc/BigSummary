import { useIsMobile } from '@/shared/lib';
import { useMemo } from 'react';
import { userListColumns } from '../ui/columns';
import { ITablePaginationProps } from '@/shared/ui';
import { UserListParams, useUserListSearchParams } from '@/entities/user/index.server';
import { useUserListUiParams } from '@/entities/user/index.client';

export function useUserList() {
  const isMobile = useIsMobile();

  const { userListData, isLoading, roleData, params, setParams } = useUserListSearchParams();
  const { params: uiParams, setParams: setUiParams } = useUserListUiParams();

  const columns = useMemo(() => {
    const base = [...userListColumns];
    return base.filter((col) => (isMobile ? !col.meta?.hideOnMobile : !col.meta?.hideOnDesktop));
  }, [isMobile]);

  const hasSelectedRow = uiParams.selectedUserId !== '';
  const targetId = uiParams.selectedUserId ? Number(uiParams.selectedUserId) : null;
  const selectedRow =
    userListData?.rows && targetId
      ? userListData.rows.find((row) => row.id === targetId)
      : undefined;

  const clearSelected = () => setUiParams({ selectedUserId: null });

  const paginationProps: ITablePaginationProps<UserListParams> = {
    total: userListData?.total ?? 0,
    totalPages: userListData?.totalPages ?? 0,
    params: params,
    setParams: setParams,
    onClearSelection: clearSelected,
  };

  const resetId = uiParams.resetPasswordUserId;

  const onCloseResetDialog = () => setUiParams({ resetPasswordUserId: null }, { shallow: true });

  return {
    params,
    setParams,
    uiParams,
    setUiParams,
    userListData,
    roleData,
    isLoading,
    columns,
    hasSelectedRow,
    selectedRow,
    clearSelected,
    isMobile,
    paginationProps,
    resetId,
    onCloseResetDialog,
  };
}
