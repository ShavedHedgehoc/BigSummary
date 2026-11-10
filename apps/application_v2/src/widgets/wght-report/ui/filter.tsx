import { throttle } from 'nuqs';
import { ComponentProps } from 'react';

import { useWghtReport } from '../model/use-wght-report';
import {
  TraceBoilWghtReportParams,
  useTraceBoilWghtReportSearchParams,
} from '@/entities/trace-boil';
import { TraceWghtReportFilter } from '@/features/filter-trace-wght-report';

export default function WeightSectionWghtReportFilter() {
  const { setUiParams } = useWghtReport();
  const { params, setParams, plantData } = useTraceBoilWghtReportSearchParams();

  type TFilterProps = ComponentProps<typeof TraceWghtReportFilter>;
  type TThrottleArgs = Parameters<TFilterProps['onFilterChangeThrottle']>[0];
  type TChangeArgs = Parameters<TFilterProps['onFilterChange']>[0];

  const onFilterChangeThrottle = (newFilters: TThrottleArgs) => {
    setParams(
      { ...newFilters, page: 1 },
      { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
    );
    setUiParams({ selectedProductId: null, selectedBatchId: null }, { shallow: true });
  };

  const onFilterChange = (newFilters: TChangeArgs) => {
    setParams({ ...newFilters, page: 1 }, { shallow: false });
    setUiParams({ selectedProductId: null, selectedBatchId: null }, { shallow: true });
  };

  const onDateChange = (type: 'start' | 'end', val: Date | undefined) => {
    if (!val) {
      setParams(
        { [type === 'start' ? 'startDate' : 'endDate']: null, page: 1 },
        { shallow: false },
      );
      return;
    }
    const normalizedDate = new Date(val);
    normalizedDate.setHours(12, 0, 0, 0);
    const updates: Partial<TraceBoilWghtReportParams> = { page: 1 };

    if (type === 'start') {
      updates.startDate = normalizedDate;
      if (params.endDate && normalizedDate > params.endDate) {
        updates.endDate = normalizedDate;
      }
    } else {
      updates.endDate = normalizedDate;
      if (params.startDate && normalizedDate < params.startDate) {
        updates.startDate = normalizedDate;
      }
    }
    setParams(updates, { shallow: false });
  };

  const resetParams = () => {
    setParams(
      {
        productId: null,
        batchName: null,
        plants: null,

        page: 1,
      },
      {
        shallow: true,
      },
    );
  };

  const handleReset = () => resetParams();
  const handleResetAll = () => {
    resetParams();
    setUiParams({ selectedBatchId: null, selectedProductId: null }, { shallow: true });
  };

  return (
    <TraceWghtReportFilter
      productId={params.productId}
      batchName={params.batchName}
      startDate={params.startDate}
      endDate={params.endDate}
      selectedPlants={params.plants}
      plantData={plantData}
      onDateChange={onDateChange}
      onFilterChangeThrottle={onFilterChangeThrottle}
      onFilterChange={onFilterChange}
      //   handleReset={handleReset}
      handleResetAll={handleResetAll}
    />
  );
}
