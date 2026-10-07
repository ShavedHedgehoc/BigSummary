import { DocListParams } from '@/entities/doc';
import { DocListFilter } from '@/features/filter-doc-list';
import { getMonthBounds, getToday } from '@/shared/lib';
import { format } from 'date-fns';
import { ComponentProps } from 'react';
import { usePlannerDocList } from '../model/use-planeer-doc-list';

const formatDateToString = (date: Date) => format(date, 'yyyy-MM-dd');

export default function PlannerDocListFilter() {
  const { params, setParams, plantData } = usePlannerDocList();

  type TFilterProps = ComponentProps<typeof DocListFilter>;
  type TChangeArgs = Parameters<TFilterProps['onFilterChange']>[0];

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
    const updates: Partial<DocListParams> = { page: 1 };

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

  const onFilterChange = (newFilters: TChangeArgs) => {
    setParams({ ...newFilters, page: 1 }, { shallow: false });
  };

  const todayStr = formatDateToString(getToday());
  const isNotToday =
    formatDateToString(params.startDate) !== todayStr ||
    formatDateToString(params.endDate) !== todayStr;
  const currentBounds = getMonthBounds();
  const isDirty =
    params.startDate.toISOString() !== currentBounds.start.toISOString() ||
    params.endDate.toISOString() !== currentBounds.end.toISOString() ||
    (params.plants && params.plants.length > 0);

  const handleSetToday = () => {
    const freshToday = getToday();
    setParams({ startDate: freshToday, endDate: freshToday, page: 1 }, { shallow: false });
  };

  const handleResetAll = () => {
    setParams(null);
  };

  return (
    <DocListFilter
      plantData={plantData}
      startDate={params.startDate}
      endDate={params.endDate}
      selectedPlants={params.plants}
      isDirty={isDirty}
      isNotToday={isNotToday}
      onDateChange={onDateChange}
      handleSetToday={handleSetToday}
      handleResetAll={handleResetAll}
      onFilterChange={onFilterChange}
    />
  );
}
