import { throttle } from 'nuqs';
import { ComponentProps } from 'react';
import { useEmployeeList } from '../model/use-employee-list';
import { EmployeeListFilter } from '@/features/filter-employees';

export default function CommonEmployeeListFilter() {
  const { params, setParams, occupationData, setUiParams } = useEmployeeList();

  type TFilterProps = ComponentProps<typeof EmployeeListFilter>;
  type TThrottleArgs = Parameters<TFilterProps['onFilterChangeThrottle']>[0];
  type TChangeArgs = Parameters<TFilterProps['onFilterChange']>[0];

  const onFilterChangeThrottle = (newFilters: TThrottleArgs) => {
    setParams(
      { ...newFilters, page: 1 },
      { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
    );
    setUiParams({ selectedEmployeeId: null }, { shallow: true });
  };

  const onFilterChange = (newFilters: TChangeArgs) => {
    setParams({ ...newFilters, page: 1 }, { shallow: false });
    setUiParams({ selectedEmployeeId: null }, { shallow: true });
  };

  const resetParams = () => {
    setParams(
      {
        name: null,
        occupations: null,
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
    setUiParams({ selectedEmployeeId: null }, { shallow: true });
  };

  return (
    <EmployeeListFilter
      occupationData={occupationData ?? []}
      name={params.name}
      selectedOccupations={params.occupations ?? []}
      onFilterChangeThrottle={onFilterChangeThrottle}
      onFilterChange={onFilterChange}
      handleReset={handleReset}
      handleResetAll={handleResetAll}
    />
  );
}
