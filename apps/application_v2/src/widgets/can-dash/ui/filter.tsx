import { throttle } from 'nuqs';
import { ComponentProps } from 'react';
import { CanDashFilter } from '@/features/filter-can-dash';
import { useCanDashSearchParams, useCanDashUiParams } from '@/entities/can';

export default function TechCanDashFilter() {
  const { setParams: setUiParams } = useCanDashUiParams();
  const { params, setParams, plantData, stateData, volumeData } = useCanDashSearchParams();

  type TFilterProps = ComponentProps<typeof CanDashFilter>;
  type TThrottleArgs = Parameters<TFilterProps['onFilterChangeThrottle']>[0];
  type TChangeArgs = Parameters<TFilterProps['onFilterChange']>[0];

  const onFilterChangeThrottle = (newFilters: TThrottleArgs) => {
    setParams(
      { ...newFilters },
      { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
    );
    setUiParams({ selectedCanId: null }, { shallow: true });
  };

  const onFilterChange = (newFilters: TChangeArgs) => {
    setParams({ ...newFilters }, { shallow: false });
    setUiParams({ selectedCanId: null }, { shallow: true });
  };

  const resetParams = () => {
    setParams(
      {
        can: null,
        volumes: [],
        states: [],
        plants: [],
        transit: false,
      },
      {
        shallow: true,
      },
    );
  };

  const handleResetAll = () => {
    resetParams();
    setUiParams({ selectedCanId: null }, { shallow: true });
  };

  return (
    <CanDashFilter
      plantData={plantData ?? []}
      stateData={stateData ?? []}
      volumeData={volumeData ?? []}
      can={params.can}
      selectedPlants={params.plants}
      selectedStates={params.states}
      selectedVolumes={params.volumes}
      isTransit={params.transit}
      onFilterChangeThrottle={onFilterChangeThrottle}
      onFilterChange={onFilterChange}
      handleResetAll={handleResetAll}
    />
  );
}
