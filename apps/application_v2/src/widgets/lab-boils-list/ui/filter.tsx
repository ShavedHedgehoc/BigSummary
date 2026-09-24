import { BoilListFilter } from '@/features/filter-boil-list';
import { useLabBoilList } from '../model/use-lab-boil-list';
import { throttle } from 'nuqs';
import { ComponentProps } from 'react';

export default function LabBoilListFilter() {
  const { plantData, stateData, params, setParams, setUiParams } = useLabBoilList();

  type TFilterProps = ComponentProps<typeof BoilListFilter>;
  type TThrottleArgs = Parameters<TFilterProps['onFilterChangeThrottle']>[0];
  type TChangeArgs = Parameters<TFilterProps['onFilterChange']>[0];

  const onFilterChangeThrottle = (newFilters: TThrottleArgs) => {
    setParams(
      { ...newFilters, page: 1 },
      { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
    );
    setUiParams({ selectedBoilId: null }, { shallow: true });
  };

  const onFilterChange = (newFilters: TChangeArgs) => {
    setParams({ ...newFilters, page: 1 }, { shallow: false });
    setUiParams({ selectedBoilId: null }, { shallow: true });
  };

  const handleReset = () => [setParams(null)];
  const handleResetAll = () => {
    setParams(null, { shallow: false });
    setUiParams({ selectedBoilId: null }, { shallow: true });
  };

  return (
    <BoilListFilter
      plantData={plantData ?? []}
      stateData={stateData ?? []}
      baseCode={params.baseCode}
      boil={params.boil}
      marking={params.marking}
      selectedPlants={params.plants}
      selectedStates={params.states}
      onFilterChangeThrottle={onFilterChangeThrottle}
      onFilterChange={onFilterChange}
      handleReset={handleReset}
      handleResetAll={handleResetAll}
    />
  );
}
