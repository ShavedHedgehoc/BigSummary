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
import { useAdminBoilList } from '../model/use-admin-boil-list';
import AdminBoilListFilter from './filter';

export default function AdminBoilListView() {
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
  } = useAdminBoilList();

  const paginationElement = isLoading ? (
    <PaginationSkeleton />
  ) : (
    <TablePagination {...paginationProps} />
  );

  return (
    <div>
      <UniversalLayoutWithPaginationSelector
        hasActionPanel={true}
        hasSelection={hasSelectedRow}
        isLoading={isLoading}
        pageHeader={<PageHeader />}
        filters={<AdminBoilListFilter />}
        pagination={paginationElement}
        table={<DataTableNew data={data?.rows ?? []} columns={columns} isLoading={isLoading} />}
        tableSkeleton={<DataTableSkeleton columns={isMobile ? 3 : 5} rows={params.limit} />}
        sidebarPanel={
          data && (
            <SidePanel
              mode="admin_update_bases"
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
