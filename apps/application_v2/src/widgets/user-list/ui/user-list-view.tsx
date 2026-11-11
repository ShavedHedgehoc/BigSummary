'use client';

import {
  DataTableSkeleton,
  PaginationSkeleton,
  TablePagination,
  DataTableNew,
  UniversalLayoutWithPaginationSelector,
} from '@/shared/ui';
import { PageHeader } from '@/widgets/page-header';
import { SidePanel } from '@/widgets/side-panel';
import { useUserList } from '../model/use-user-list';
import AdminUserListFilter from './filter';
import { ResetUserPasswordDialog } from '@/features/process-user';

export default function UserListView() {
  const {
    isLoading,
    paginationProps,
    hasSelectedRow,
    userListData,
    columns,
    isMobile,
    params,
    selectedRow,
    clearSelected,
    resetId,
    onCloseResetDialog,
  } = useUserList();

  const paginationElement = isLoading ? (
    <PaginationSkeleton />
  ) : (
    <TablePagination {...paginationProps} />
  );

  return (
    <div>
      <UniversalLayoutWithPaginationSelector
        hasSelection={hasSelectedRow}
        isLoading={isLoading}
        pageHeader={<PageHeader />}
        filters={<AdminUserListFilter />}
        pagination={paginationElement}
        table={
          <DataTableNew data={userListData?.rows ?? []} columns={columns} isLoading={isLoading} />
        }
        tableSkeleton={<DataTableSkeleton columns={isMobile ? 3 : 5} rows={params.limit} />}
        sidebarPanel={
          userListData && (
            <SidePanel
              mode="admin_users"
              row={selectedRow ?? undefined}
              className="w-full m-0 @min-6xl/main:w-110 shrink-0 h-full max-w-2xl"
              onClose={clearSelected}
              clearSelected={clearSelected}
            />
          )
        }
      />
      <ResetUserPasswordDialog resetId={resetId} onClose={onCloseResetDialog} />
    </div>
  );
}
