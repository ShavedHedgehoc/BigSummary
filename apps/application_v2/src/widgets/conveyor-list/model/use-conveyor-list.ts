import { useIsMobile } from '@/shared/lib';
import { useMemo } from 'react';
import { ITablePaginationProps } from '@/shared/ui';
import {
  ConveyorListParams,
  useConveyorListSearchParams,
  useConveyorListUiParams,
} from '@/entities/conveyor';

import { conveyorListColumns } from '../ui/columns';

export function useConveyorList() {
  const isMobile = useIsMobile();

  const { conveyorListData, isLoading, params, setParams } = useConveyorListSearchParams();
  const { params: uiParams, setParams: setUiParams } = useConveyorListUiParams();

  const columns = useMemo(() => {
    const base = [...conveyorListColumns];
    return base.filter((col) => (isMobile ? !col.meta?.hideOnMobile : !col.meta?.hideOnDesktop));
  }, [isMobile]);

  const hasSelectedRow = uiParams.selectedConveyorId !== '';
  const targetId = uiParams.selectedConveyorId ? Number(uiParams.selectedConveyorId) : null;
  const selectedRow =
    conveyorListData?.rows && targetId
      ? conveyorListData.rows.find((row) => row.id === targetId)
      : undefined;

  const clearSelected = () => setUiParams({ selectedConveyorId: null });

  const paginationProps: ITablePaginationProps<ConveyorListParams> = {
    total: conveyorListData?.total ?? 0,
    totalPages: conveyorListData?.totalPages ?? 0,
    params: params,
    setParams: setParams,
    onClearSelection: clearSelected,
  };

  return {
    params,
    setParams,
    uiParams,
    setUiParams,
    isLoading,
    columns,
    hasSelectedRow,
    selectedRow,
    clearSelected,
    isMobile,
    paginationProps,
    conveyorListData,
  };
}
