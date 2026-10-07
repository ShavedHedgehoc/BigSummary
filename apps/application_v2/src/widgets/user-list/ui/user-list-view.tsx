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

export default function UserListView() {
  const {
    isLoading,
    paginationProps,
    hasSelectedRow,
    data,
    columns,
    isMobile,
    params,
    selectedRow,
    clearSelected,
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
        filters={<></>}
        pagination={paginationElement}
        table={<DataTableNew data={data?.rows ?? []} columns={columns} isLoading={isLoading} />}
        tableSkeleton={<DataTableSkeleton columns={isMobile ? 3 : 5} rows={params.limit} />}
        sidebarPanel={
          data && (
            <SidePanel
              mode="admin_users"
              row={selectedRow ?? undefined}
              className="w-full m-0 @min-6xl/main:w-110 shrink-0 h-full max-w-2xl"
              onClose={clearSelected}
            />
          )
        }
      />
    </div>
  );
}
