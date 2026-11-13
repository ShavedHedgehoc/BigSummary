import { throttle } from 'nuqs';
import { ComponentProps } from 'react';

import { useWeightingList } from '../model/use-weighting-list';
import { TraceWeightingListParams, useWeightingListSearchParams } from '@/entities/weighting';
import { WeightingListFilter } from '@/features/filter-weighting-list';
import { getToday, getTomorrow } from '@/shared/lib';
import { format } from 'date-fns';
import { DownloadWeightingReportButton } from '@/features/download-wght-report';

const formatDateToString = (date: Date) => format(date, 'yyyy-MM-dd');

export default function WeightSectionWeightingFilter() {
  const { setUiParams } = useWeightingList();
  const { params, setParams, plantData } = useWeightingListSearchParams();

  type TFilterProps = ComponentProps<typeof WeightingListFilter>;
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
    const updates: Partial<TraceWeightingListParams> = { page: 1 };

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
        startDate: null,
        endDate: null,
        productId: null,
        batchName: null,
        plants: null,
        compare: true,
        sortByBatch: false,
        page: 1,
      },
      {
        shallow: true,
      },
    );
  };

  const todayStr = formatDateToString(getToday());
  const isNotToday =
    formatDateToString(params.startDate) !== todayStr ||
    formatDateToString(params.endDate) !== todayStr;

  const tomorrowStr = formatDateToString(getTomorrow());
  const isNotTomorrow =
    formatDateToString(params.startDate) !== tomorrowStr ||
    formatDateToString(params.endDate) !== tomorrowStr;

  const handleSetToday = () => {
    const freshToday = getToday();
    setParams({ startDate: freshToday, endDate: freshToday, page: 1 }, { shallow: false });
  };
  const handleSetTomorrow = () => {
    const freshTomorrow = getTomorrow();
    setParams({ startDate: freshTomorrow, endDate: freshTomorrow, page: 1 }, { shallow: false });
  };

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
    isNotToday ||
    params.productId !== '' ||
    params.batchName !== '' ||
    (params.plants && params.plants.length > 0) ||
    params.compare === false ||
    params.sortByBatch === true;

  return (
    <WeightingListFilter
      productId={params.productId}
      batchName={params.batchName}
      startDate={params.startDate}
      endDate={params.endDate}
      selectedPlants={params.plants}
      compare={params.compare}
      sortByBatch={params.sortByBatch}
      plantData={plantData}
      isNotToday={isNotToday}
      isNotTomorrow={isNotTomorrow}
      isDirty={isDirty}
      handleSetToday={handleSetToday}
      handleSetTomorrow={handleSetTomorrow}
      onDateChange={onDateChange}
      onFilterChangeThrottle={onFilterChangeThrottle}
      onFilterChange={onFilterChange}
      handleResetAll={handleResetAll}
      actionButton={<DownloadWeightingReportButton />}
    />
  );
}
