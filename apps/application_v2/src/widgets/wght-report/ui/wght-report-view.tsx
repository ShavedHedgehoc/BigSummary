'use client';

import {
  DataTableSkeleton,
  PaginationSkeleton,
  TablePagination,
  DataTableNew,
  UniversalLayoutWithPaginationSelector,
  UniversalLayoutWithPagination,
} from '@/shared/ui';
import { PageHeader } from '@/widgets/page-header';
// import { SidePanel } from '@/widgets/side-panel';
import { useWghtReport } from '../model/use-wght-report';
import WeightSectionWghtReportFilter from './filter';

export default function WghtReportView() {
  const {
    isLoading,
    paginationProps,
    hasSelectedRow,
    wghtReportData,
    columns,
    isMobile,
    params,
    // selectedRow,
    // clearSelected,
  } = useWghtReport();

  const paginationElement = isLoading ? (
    <PaginationSkeleton />
  ) : (
    <TablePagination {...paginationProps} />
  );

  return (
    <div>
      <UniversalLayoutWithPagination
        // hasSelection={hasSelectedRow}
        isLoading={isLoading}
        pageHeader={<PageHeader />}
        filters={<WeightSectionWghtReportFilter />}
        pagination={paginationElement}
        table={
          <DataTableNew data={wghtReportData?.rows ?? []} columns={columns} isLoading={isLoading} />
        }
        tableSkeleton={<DataTableSkeleton columns={isMobile ? 3 : 5} rows={params.limit} />}
        // emptyState={null}
        sidebarPanel={
          null
          //   userListData && (
          //     <SidePanel
          //       mode="admin_users"
          //       row={selectedRow ?? undefined}
          //       className="w-full m-0 @min-6xl/main:w-110 shrink-0 h-full max-w-2xl"
          //       onClose={clearSelected}
          //       clearSelected={clearSelected}
          //     />
          //   )
        }
      />
    </div>
  );
}
