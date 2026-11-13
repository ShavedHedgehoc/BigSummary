import { useIsMobile } from '@/shared/lib';
import { useMemo } from 'react';
import { ITablePaginationProps } from '@/shared/ui';
import {
  TraceWeightingListParams,
  useWeightingListSearchParams,
  useWeightingListUiParams,
} from '@/entities/weighting';
import { weightingListColumns } from '../ui/columns';
import { TApplicationTraceWeightingListPaginatedRowItem } from '@repo/schemas';

export function useWeightingList() {
  const isMobile = useIsMobile();

  const {
    data: weightingData,
    isLoading,
    plantData,
    params,
    setParams,
  } = useWeightingListSearchParams();
  const { params: uiParams, setParams: setUiParams } = useWeightingListUiParams();

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

  const paginationProps: ITablePaginationProps<TraceWeightingListParams> = {
    total: weightingData?.total ?? 0,
    totalPages: weightingData?.totalPages ?? 0,
    params: params,
    setParams: setParams,
    onClearSelection: clearSelected,
  };

  return {
    params,
    setParams,
    uiParams,
    setUiParams,
    weightingData,
    plantData,
    isLoading,
    columns,
    hasSelectedRow,
    selectedRow,
    clearSelected,
    isMobile,
    paginationProps,
  };
}
