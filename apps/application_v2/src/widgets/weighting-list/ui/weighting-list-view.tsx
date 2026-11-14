'use client';

import { DataTableSkeleton, DataTableNew, UniversalLayoutWithScroll } from '@/shared/ui';
import { PageHeader } from '@/widgets/page-header';
import { SidePanel } from '@/widgets/side-panel';
import { useWeightingList } from '../model/use-weighting-list';
import WeightSectionWeightingFilter from './filter';
import { PendingReportModal } from '@/features/download-wght-report';

export default function WeightingListView() {
  const {
    isLoading,
    isFetching,
    hasSelectedRow,
    weightingData,
    columns,
    isMobile,
    selectedRow,
    clearSelected,
    handleHideProduct,
  } = useWeightingList();
  return (
    <div>
      <UniversalLayoutWithScroll
        hasActionPanel={true}
        hasSelection={hasSelectedRow}
        isLoading={isLoading}
        pageHeader={<PageHeader />}
        filters={<WeightSectionWeightingFilter />}
        table={
          <DataTableNew
            meta={{
              isFetching,
              onHideProduct: handleHideProduct,
            }}
            data={weightingData?.rows ?? []}
            columns={columns}
            isLoading={isLoading}
          />
        }
        tableSkeleton={<DataTableSkeleton columns={isMobile ? 3 : 7} rows={isMobile ? 10 : 15} />}
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
