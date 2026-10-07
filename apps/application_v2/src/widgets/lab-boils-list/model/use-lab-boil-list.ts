import { BoilListParams, useBoilListSearchParams } from '@/entities/boil';
import { useIsMobile } from '@/shared/lib';
import { useMemo } from 'react';
import { labBoilListColumns } from '../ui/columns';
import { ITablePaginationProps } from '@/shared/ui';
import { useLabBoilListUiParams } from './use-lab-boil-list-ui-params';

export function useLabBoilList() {
  const isMobile = useIsMobile();
  const { params, setParams, data, plantData, stateData, isLoading } =
    useBoilListSearchParams('lab');
  const { params: uiParams, setParams: setUiParams } = useLabBoilListUiParams();

  const columns = useMemo(() => {
    const base = [...labBoilListColumns];
    return base.filter((col) => (isMobile ? !col.meta?.hideOnMobile : !col.meta?.hideOnDesktop));
  }, [isMobile]);

  const hasSelectedRow = uiParams.selectedBoilId !== '';
  const targetId = uiParams.selectedBoilId ? Number(uiParams.selectedBoilId) : null;
  const selectedRow =
    data?.rows && targetId ? data.rows.find((row) => row.id === targetId) : undefined;

  const clearSelected = () => setUiParams({ selectedBoilId: '' });

  const paginationProps: ITablePaginationProps<BoilListParams> = {
    total: data?.total ?? 0,
    totalPages: data?.totalPages ?? 0,
    params: params,
    setParams: setParams,
    onClearSelection: clearSelected,
  };

  return {
    params,
    setParams,
    setUiParams,
    data,
    isLoading,
    plantData,
    stateData,
    columns,
    hasSelectedRow,
    selectedRow,
    clearSelected,
    isMobile,
    paginationProps,
  };
}
