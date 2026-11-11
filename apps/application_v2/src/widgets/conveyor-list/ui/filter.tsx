import { throttle } from 'nuqs';
import { ComponentProps } from 'react';

import { ConveyorListFilter } from '@/features/filter-conveyor-list';
import { useConveyorList } from '../model/use-conveyor-list';

export default function PlannerConveyorListFilter() {
  const { params, setParams, setUiParams } = useConveyorList();

  type TFilterProps = ComponentProps<typeof ConveyorListFilter>;
  type TThrottleArgs = Parameters<TFilterProps['onFilterChangeThrottle']>[0];
  type TChangeArgs = Parameters<TFilterProps['onFilterChange']>[0];

  const onFilterChangeThrottle = (newFilters: TThrottleArgs) => {
    setParams(
      { ...newFilters, page: 1 },
      { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
    );
    setUiParams({ selectedConveyorId: null }, { shallow: true });
  };

  const onFilterChange = (newFilters: TChangeArgs) => {
    setParams({ ...newFilters, page: 1 }, { shallow: false });
    setUiParams({ selectedConveyorId: null }, { shallow: true });
  };

  const handleResetAll = () => {
    setParams(
      {
        value: null,
        barcodes: [],
        records: [],
      },
      {
        shallow: true,
      },
    );
    setUiParams({ selectedConveyorId: null }, { shallow: true });
  };

  return (
    <ConveyorListFilter
      value={params.value}
      selectedBarcodes={params.barcodes}
      selectedRecords={params.records}
      onFilterChangeThrottle={onFilterChangeThrottle}
      onFilterChange={onFilterChange}
      handleResetAll={handleResetAll}
    />
  );
}
