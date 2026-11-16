import { useWeightingListSearchParams } from '@/entities/weighting';
import { useExcludedProductsStore } from './use-excluded-products-store';

export function useClearExcludedProducts() {
  const isEmpty = useExcludedProductsStore((state) => state.items.length === 0);
  const clearExcludedProducts = useExcludedProductsStore((state) => state.clearExcludedProducts);
  const { setParams, isFetching } = useWeightingListSearchParams();

  const clearExcludedProductsAndParams = () => {
    clearExcludedProducts();
    setParams({
      excludeProductIds: null,
    });
  };

  return {
    clearExcludedProductsAndParams,
    isDisabled: isFetching || isEmpty,
  };
}
