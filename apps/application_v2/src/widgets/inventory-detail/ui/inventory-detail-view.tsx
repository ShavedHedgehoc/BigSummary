'use client';

import { DataTableSkeleton } from '@/shared/ui';
import { PageHeader } from '@/widgets/page-header';
import { DataTableNew } from '@/shared/ui/table-layout/ui/data-table-new';
import { InventoryDetailMobileSubHeader, InventoryDetailSubHeader } from './subheader';
import { UniversalLayoutWithScroll } from '@/shared/ui';
import { useInventoryDetail } from '../model/use-inventory-detail';
import WeightingsInventoryDetailFilter from './filter';

interface InventoryDetailViewProps {
  inventoryId: number;
}

export default function InventoryDetailView({ inventoryId }: InventoryDetailViewProps) {
  const { isLoading, data, columns, isMobile } = useInventoryDetail(inventoryId);

  return (
    <UniversalLayoutWithScroll
      hasSelection={false}
      isLoading={isLoading}
      pageHeader={<PageHeader />}
      subHeader={<InventoryDetailSubHeader data={data} isLoading={isLoading} />}
      mobileSubHeader={<InventoryDetailMobileSubHeader data={data} isLoading={isLoading} />}
      filters={<WeightingsInventoryDetailFilter inventoryId={inventoryId} />}
      table={<DataTableNew data={data?.rows ?? []} columns={columns} isLoading={isLoading} />}
      tableSkeleton={<DataTableSkeleton columns={isMobile ? 3 : 5} rows={isMobile ? 10 : 15} />}
    />
  );
}
