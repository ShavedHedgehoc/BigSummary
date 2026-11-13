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
import { useWeightingList } from '../model/use-weighting-list';
import WeightSectionWeightingFilter from './filter';
import { PendingReportModal } from '@/features/download-wght-report';

export default function WeightingListView() {
  const {
    isLoading,
    paginationProps,
    hasSelectedRow,
    weightingData,
    columns,
    isMobile,
    params,
    selectedRow,
    clearSelected,
  } = useWeightingList();

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
        filters={<WeightSectionWeightingFilter />}
        pagination={paginationElement}
        table={
          <DataTableNew data={weightingData?.rows ?? []} columns={columns} isLoading={isLoading} />
        }
        tableSkeleton={<DataTableSkeleton columns={isMobile ? 3 : 7} rows={params.limit} />}
        sidebarPanel={
          <SidePanel
            mode="wght_report"
            row={selectedRow ?? undefined}
            className="w-full m-0 @min-6xl/main:w-110 shrink-0 h-full max-w-2xl"
            onClose={clearSelected}
            clearSelected={clearSelected}
          />
        }
      />
      <PendingReportModal />
    </div>
  );
}
