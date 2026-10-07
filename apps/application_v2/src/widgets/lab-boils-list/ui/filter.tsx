import { BoilListFilter } from '@/features/filter-boil-list';
import { useLabBoilList } from '../model/use-lab-boil-list';
import { throttle } from 'nuqs';
import { ComponentProps } from 'react';
import { useBoilListSearchParams } from '@/entities/boil';

export default function LabBoilListFilter() {
  const { setUiParams } = useLabBoilList();
  const { params, setParams, stateData, plantData } = useBoilListSearchParams('lab');

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

  const resetParams = () => {
    setParams(
      {
        boil: null,
        baseCode: null,
        marking: null,
        states: [],
        // plants: params.plants,
        plants: [],
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
