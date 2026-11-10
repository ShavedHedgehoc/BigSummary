import { useIsMobile } from '@/shared/lib';
import { useMemo } from 'react';
import { ITablePaginationProps } from '@/shared/ui';
import {
  TraceBoilWghtReportParams,
  useTraceBoilWghtReportSearchParams,
  useWghtReportUiParams,
} from '@/entities/trace-boil';
import { traceBoilWghtReportColumns } from '../ui/columns';

export function useWghtReport() {
  const isMobile = useIsMobile();

  const {
    data: wghtReportData,
    isLoading,
    plantData,
    params,
    setParams,
  } = useTraceBoilWghtReportSearchParams();
  const { params: uiParams, setParams: setUiParams } = useWghtReportUiParams();

  const columns = useMemo(() => {
    const base = [...traceBoilWghtReportColumns];
    return base.filter((col) => (isMobile ? !col.meta?.hideOnMobile : !col.meta?.hideOnDesktop));
  }, [isMobile]);

  const hasSelectedRow = uiParams.selectedBatchId !== '' && uiParams.selectedProductId !== '';
  const targetBatchId = uiParams.selectedBatchId ? Number(uiParams.selectedBatchId) : null;
  const targetProductId = uiParams.selectedProductId ? uiParams.selectedProductId : null;
  const selectedRow =
    wghtReportData?.rows && targetProductId && targetBatchId
      ? wghtReportData.rows.find(
          (row) => row.batchId === targetBatchId && row.productId === targetProductId,
        )
      : undefined;

  const clearSelected = () => setUiParams({ selectedProductId: null, selectedBatchId: null });

  const paginationProps: ITablePaginationProps<TraceBoilWghtReportParams> = {
    total: wghtReportData?.total ?? 0,
    totalPages: wghtReportData?.totalPages ?? 0,
    params: params,
    setParams: setParams,
    onClearSelection: clearSelected,
  };

  return {
    params,
    setParams,
    uiParams,
    setUiParams,
    wghtReportData,
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
