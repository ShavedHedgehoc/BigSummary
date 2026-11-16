import { useIsMobile } from '@/shared/lib';
import { useEffect, useCallback, useMemo } from 'react';
import { useWeightingListSearchParams, useWeightingListUiParams } from '@/entities/weighting';
import { weightingListColumns } from '../ui/columns';
import { TApplicationTraceWeightingListPaginatedRowItem } from '@repo/schemas';
import { useExcludedProductsStore } from '@/features/view-excluded-products';
import { useShallow } from 'zustand/react/shallow';

export function useWeightingList() {
  const isMobile = useIsMobile();

  const {
    data: weightingData,
    isLoading,
    isFetching,
    plantData,
    params,
    setParams,
  } = useWeightingListSearchParams();
  const { params: uiParams, setParams: setUiParams } = useWeightingListUiParams();

  const { items, syncFromIds, addExcludedProduct } = useExcludedProductsStore(
    useShallow((state) => ({
      items: state.items,
      syncFromIds: state.syncFromIds,
      addExcludedProduct: state.addExcludedProduct,
    })),
  );
  useEffect(() => {
    syncFromIds(params.excludeProductIds ?? []);
  }, [params.excludeProductIds, syncFromIds]);

  const columns = useMemo(() => {
    const base = [...weightingListColumns];
    return base.filter((col) => (isMobile ? !col.meta?.hideOnMobile : !col.meta?.hideOnDesktop));
  }, [isMobile]);

  const hasSelectedRow = uiParams.selectedBatchId !== '' && uiParams.selectedProductId !== '';
  const targetBatchId = uiParams.selectedBatchId ? Number(uiParams.selectedBatchId) : null;
  const targetProductId = uiParams.selectedProductId ? uiParams.selectedProductId : null;

  const selectedRow = useMemo((): TApplicationTraceWeightingListPaginatedRowItem | undefined => {
    if (!weightingData?.rows || !targetProductId || !targetBatchId) {
      return undefined;
    }

    for (const row of weightingData.rows) {
      if (
        'weightings' in row &&
        row.batchId === targetBatchId &&
        row.productId === targetProductId
      ) {
        return row;
      }
    }

    return undefined;
  }, [weightingData, targetProductId, targetBatchId]);

  const clearSelected = () => setUiParams({ selectedProductId: null, selectedBatchId: null });

  const isHasExcluded = items.length > 0;

  const handleHideProduct = useCallback(
    (cleanId: string, name?: string | null) => {
      clearSelected();
      addExcludedProduct({ productId: cleanId, productName: name ?? cleanId });
      setParams((prev) => {
        const current = prev.excludeProductIds ?? [];
        if (current.includes(cleanId)) return prev;
        return { excludeProductIds: [...current, cleanId] };
      });
    },
    [clearSelected, setParams, addExcludedProduct],
  );

  return {
    params,
    setParams,
    uiParams,
    setUiParams,
    weightingData,
    plantData,
    isLoading,
    isFetching,
    columns,
    hasSelectedRow,
    selectedRow,
    clearSelected,
    isMobile,
    handleHideProduct,
    isHasExcluded,
  };
}
