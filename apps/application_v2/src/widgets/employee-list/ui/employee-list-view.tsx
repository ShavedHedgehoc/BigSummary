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
import { useEmployeeList } from '../model/use-employee-list';
import CommonEmployeeListFilter from './filter';

export default function EmployeeListView() {
  const {
    isLoading,
    paginationProps,
    hasSelectedRow,
    employeeListData,
    columns,
    isMobile,
    params,
    selectedRow,
    clearSelected,
  } = useEmployeeList();

  const paginationElement = isLoading ? (
    <PaginationSkeleton />
  ) : (
    <TablePagination {...paginationProps} />
  );

  return (
    <div>
      <UniversalLayoutWithPaginationSelector
        hasSelection={hasSelectedRow}
        hasActionPanel={true}
        isLoading={isLoading}
        pageHeader={<PageHeader />}
        filters={<CommonEmployeeListFilter />}
        pagination={paginationElement}
        table={
          <DataTableNew
            data={employeeListData?.rows ?? []}
            columns={columns}
            isLoading={isLoading}
          />
        }
        tableSkeleton={<DataTableSkeleton columns={isMobile ? 3 : 5} rows={params.limit} />}
        sidebarPanel={
          employeeListData && (
            <SidePanel
              mode="employees"
              row={selectedRow ?? undefined}
              className="w-full m-0 @min-6xl/main:w-110 shrink-0 h-full max-w-2xl"
              onClose={clearSelected}
              clearSelected={clearSelected}
            />
          )
        }
      />
    </div>
  );
}
