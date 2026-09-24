import { throttle } from 'nuqs';
import { ComponentProps } from 'react';

import { ProductListFilter } from '@/features/filter-product-list';
import { useForemanProductList } from '../model/use-foreman-product-list';

export default function ForemanProductListFilter() {
  const { plantData, stateData, params, setParams, setUiParams } = useForemanProductList();

  type TFilterProps = ComponentProps<typeof ProductListFilter>;
  type TThrottleArgs = Parameters<TFilterProps['onFilterChangeThrottle']>[0];
  type TChangeArgs = Parameters<TFilterProps['onFilterChange']>[0];

  const onFilterChangeThrottle = (newFilters: TThrottleArgs) => {
    setParams(
      { ...newFilters },
      { shallow: false, throttleMs: 500, limitUrlUpdates: throttle(500) },
    );
    setUiParams({ selectedRecordId: null }, { shallow: true });
  };

  const onFilterChange = (newFilters: TChangeArgs) => {
    setParams({ ...newFilters }, { shallow: false });
    setUiParams({ selectedRecordId: null }, { shallow: true });
  };

  const handleResetAll = () => {
    setParams(null, { shallow: false });
    setUiParams({ selectedRecordId: null }, { shallow: true });
  };

  return (
    <ProductListFilter
      plantData={plantData ?? []}
      stateData={stateData ?? []}
      productCode={params.productCode}
      boil={params.boil}
      marking={params.marking}
      conveyor={params.conveyor}
      selectedPlants={params.plants}
      selectedStates={params.states}
      onFilterChangeThrottle={onFilterChangeThrottle}
      onFilterChange={onFilterChange}
      handleReset={handleResetAll}
      handleResetAll={handleResetAll}
    />
  );
}
