import { throttle } from 'nuqs';
import { ComponentProps } from 'react';

import { useWeightingList } from '../model/use-weighting-list';
import { useWeightingListSearchParams } from '@/entities/weighting';
import { WeightingListFilter } from '@/features/filter-weighting-list';
import { getTomorrow } from '@/shared/lib';
import { format } from 'date-fns';
import { DownloadWeightingReportButton } from '@/features/download-wght-report';

const formatDateToString = (date: Date) => format(date, 'yyyy-MM-dd');

export default function WeightSectionWeightingFilter() {
  const { setUiParams, isHasExcluded } = useWeightingList();
  const { params, setParams, plantData } = useWeightingListSearchParams();

  type TFilterProps = ComponentProps<typeof WeightingListFilter>;
  type TThrottleArgs = Parameters<TFilterProps['onFilterChangeThrottle']>[0];
  type TChangeArgs = Parameters<TFilterProps['onFilterChange']>[0];

  const onFilterChangeThrottle = (newFilters: TThrottleArgs) => {
    setParams(
      { ...newFilters },
      { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
    );
    setUiParams({ selectedProductId: null, selectedBatchId: null }, { shallow: true });
  };

  const onFilterChange = (newFilters: TChangeArgs) => {
    setParams({ ...newFilters }, { shallow: false });
    setUiParams({ selectedProductId: null, selectedBatchId: null }, { shallow: true });
  };

  const onDateChange = (val: Date | undefined) => {
    if (!val) {
      setParams({ batchDate: null });
      return;
    }

    const normalizedDate = new Date(val);
    normalizedDate.setHours(12, 0, 0, 0);

    setParams({ batchDate: normalizedDate });
  };

  const resetParams = () => {
    setParams(
      {
        batchDate: null,
        productId: null,
        batchName: null,
        plants: null,
        compare: true,
      },
      {
        shallow: true,
      },
    );
  };

  const tomorrowStr = formatDateToString(getTomorrow());
  const isNotTomorrow = formatDateToString(params.batchDate) !== tomorrowStr;

  const handleResetAll = () => {
    resetParams();
    setUiParams(
      {
        selectedBatchId: null,
        selectedProductId: null,
      },
      { shallow: true },
    );
  };

  const isDirty =
    isNotTomorrow ||
    params.productId !== '' ||
    params.batchName !== '' ||
    (params.plants && params.plants.length > 0) ||
    params.compare === false;

  return (
    <WeightingListFilter
      productId={params.productId}
      batchName={params.batchName}
      batchDate={params.batchDate}
      selectedPlants={params.plants}
      compare={params.compare}
      plantData={plantData}
      isDirty={isDirty}
      isHasExcluded={isHasExcluded}
      onDateChange={onDateChange}
      onFilterChangeThrottle={onFilterChangeThrottle}
      onFilterChange={onFilterChange}
      handleResetAll={handleResetAll}
      actionButton={<DownloadWeightingReportButton />}
    />
  );
}
