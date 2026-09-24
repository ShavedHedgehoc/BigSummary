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
import { useLabBoilList } from '../model/use-lab-boil-list';
import LabBoilListFilter from './filter';

export default function LabBoilListView() {
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
  } = useLabBoilList();

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
        filters={<LabBoilListFilter />}
        pagination={paginationElement}
        table={<DataTableNew data={data?.rows ?? []} columns={columns} isLoading={isLoading} />}
        tableSkeleton={<DataTableSkeleton columns={isMobile ? 3 : 5} rows={params.limit} />}
        sidebarPanel={
          data && (
            <SidePanel
              mode="laboratory_boils"
              row={selectedRow ?? null}
              className="w-full m-0 @min-6xl/main:w-110 shrink-0 h-full max-w-2xl"
              onClose={clearSelected}
            />
          )
        }
      />
    </div>
  );
}
