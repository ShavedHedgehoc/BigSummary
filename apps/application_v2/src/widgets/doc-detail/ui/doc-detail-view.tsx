'use client';

import { DataTableSkeleton } from '@/shared/ui';
import { PageHeader } from '@/widgets/page-header';
import { DataTableNew } from '@/shared/ui/table-layout/ui/data-table-new';
import { DocDetailMobileSubHeader, DocDetailSubHeader } from './subheader';
import { UniversalLayoutWithScroll } from '@/shared/ui';
import { SidePanel } from '@/widgets/side-panel';
import { useDocDetail } from '../model/use-doc-detail';
import DocDetailFilter from './filter';

interface DocDetailViewProps {
  docId: number;
}

export default function DocDetailView({ docId }: DocDetailViewProps) {
  const {
    isLoading,
    hasSelectedRow,
    data,
    // stateData,
    columns,
    isMobile,
    selectedRow,
    clearSelected,
  } = useDocDetail(docId);

  return (
    <UniversalLayoutWithScroll
      hasSelection={hasSelectedRow}
      isLoading={isLoading}
      pageHeader={<PageHeader />}
      subHeader={<DocDetailSubHeader data={data} isLoading={isLoading} />}
      mobileSubHeader={<DocDetailMobileSubHeader data={data} isLoading={isLoading} />}
      filters={<DocDetailFilter />}
      table={<DataTableNew data={data?.rows ?? []} columns={columns} isLoading={isLoading} />}
      tableSkeleton={<DataTableSkeleton columns={isMobile ? 3 : 5} rows={isMobile ? 10 : 15} />}
      sidebarPanel={
        data && (
          <SidePanel
            mode="planner"
            row={selectedRow ?? undefined}
            className="w-full m-0 @min-6xl/main:w-110 shrink-0 h-full max-w-2xl"
            onClose={clearSelected}
            clearSelected={clearSelected}
          />
        )
      }
    />
  );
}
