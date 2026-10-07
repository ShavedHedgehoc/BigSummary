import { useMemo } from 'react';
import { useIsMobile } from '@/shared/lib';
import { useRecordListSearchParams } from '@/entities/record';
import { useLabProductListUiParams } from './use-lab-product-list-ui-params';
import { labProductListColumns } from '../ui/columns';

export function useLabProductList() {
  const isMobile = useIsMobile();
  const { data, plantData, stateData, isLoading, params, setParams } =
    useRecordListSearchParams('lab');
  const { params: uiParams, setParams: setUiParams } = useLabProductListUiParams();

  const columns = useMemo(() => {
    const base = [...labProductListColumns];
    return base.filter((col) => (isMobile ? !col.meta?.hideOnMobile : !col.meta?.hideOnDesktop));
  }, [isMobile]);

  const hasSelectedRow = uiParams.selectedRecordId !== '';
  const targetId = uiParams.selectedRecordId ? Number(uiParams.selectedRecordId) : null;
  const selectedRow =
    data?.rows && targetId ? data.rows.find((row) => row.id === targetId) : undefined;

  const clearSelected = () => setUiParams({ selectedRecordId: '' });

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
  };
}
