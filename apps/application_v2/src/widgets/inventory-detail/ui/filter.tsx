import { ComponentProps } from 'react';
import { InventoryDetailFilter } from '@/features/filter-inventory-detail';
import { useInventoryDetail } from '../model/use-inventory-detail';
import { throttle } from 'nuqs';
import { DownloadInventoryButton } from '@/features/dowload-inventory';
import { TApplicationTraceInventoryDetailResponse } from '@repo/schemas';

export default function WeightingsInventoryDetailFilter({ inventoryId }: { inventoryId: number }) {
  const { params, setParams, data } = useInventoryDetail(inventoryId);

  type TFilterProps = ComponentProps<typeof InventoryDetailFilter>;
  type TThrottleArgs = Parameters<TFilterProps['onFilterChangeThrottle']>[0];
  type TChangeArgs = Parameters<TFilterProps['onFilterChange']>[0];

  const onFilterChange = (newFilters: TChangeArgs) => {
    setParams({ ...newFilters }, { shallow: false });
  };

  const onFilterChangeThrottle = (newFilters: TThrottleArgs) => {
    setParams(
      { ...newFilters },
      { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
    );
  };

  const handleResetAll = () => {
    setParams(null);
  };

  const castedData = (data ?? null) as TApplicationTraceInventoryDetailResponse | null;

  return (
    <InventoryDetailFilter
      productCode={params.productCode}
      selectedDaysToExp={params.dayToExpireRest}
      isApplyFilter={params.applyFilter}
      handleResetAll={handleResetAll}
      onFilterChange={onFilterChange}
      onFilterChangeThrottle={onFilterChangeThrottle}
      actionButton={
        <DownloadInventoryButton key={data ? 'data-loaded' : 'data-loading'} data={castedData} />
      }
    />
  );
}
