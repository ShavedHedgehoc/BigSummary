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
import { useConveyorList } from '../model/use-conveyor-list';
import PlannerConveyorListFilter from './filter';

export default function ConveyorListView() {
  const {
    isLoading,
    paginationProps,
    hasSelectedRow,
    conveyorListData,
    columns,
    isMobile,
    params,
    selectedRow,
    clearSelected,
  } = useConveyorList();

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
        filters={<PlannerConveyorListFilter />}
        pagination={paginationElement}
        table={
          <DataTableNew
            data={conveyorListData?.rows ?? []}
            columns={columns}
            isLoading={isLoading}
          />
        }
        tableSkeleton={<DataTableSkeleton columns={isMobile ? 3 : 5} rows={params.limit} />}
        sidebarPanel={
          conveyorListData && (
            <SidePanel
              mode="conveyors"
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
