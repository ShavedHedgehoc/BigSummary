'use client';

import { DataTableSkeleton } from '@/shared/ui';
import { PageHeader } from '@/widgets/page-header';
import { DataTableNew } from '@/shared/ui/table-layout/ui/data-table-new';
import { UniversalLayoutWithScroll } from '@/shared/ui';
import { SidePanel } from '@/widgets/side-panel';
import { useLabProductList } from '../model/use-lab-product-list';
import LabProductListFilter from './filter';

export default function LabProductListView() {
  const { data, isLoading, columns, hasSelectedRow, selectedRow, clearSelected, isMobile } =
    useLabProductList();

  return (
    <UniversalLayoutWithScroll
      hasSelection={hasSelectedRow}
      isLoading={isLoading}
      pageHeader={<PageHeader />}
      filters={<LabProductListFilter />}
      table={<DataTableNew data={data?.rows ?? []} columns={columns} isLoading={isLoading} />}
      tableSkeleton={<DataTableSkeleton columns={isMobile ? 3 : 5} rows={isMobile ? 10 : 15} />}
      sidebarPanel={
        data && (
          <SidePanel
            mode="laboratory_products"
            row={selectedRow ?? null}
            className="w-full m-0 @min-6xl/main:w-110 shrink-0 h-full max-w-2xl"
            onClose={clearSelected}
          />
        )
      }
    />
  );
}
