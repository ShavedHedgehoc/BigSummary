import { throttle } from 'nuqs';
import { ComponentProps } from 'react';
import { useLabProductList } from '../model/use-lab-product-list';
import { ProductListFilter } from '@/features/filter-product-list';
import { useRecordListSearchParams } from '@/entities/record/lib/use-search-params';

export default function LabProductListFilter() {
  const { setUiParams } = useLabProductList();
  const { plantData, stateData, params, setParams } = useRecordListSearchParams('lab');

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
    setParams(
      {
        boil: null,
        productCode: null,
        marking: null,
        conveyor: null,
        states: [],
        plants: params.plants,
      },
      {
        shallow: true,
      },
    );

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
