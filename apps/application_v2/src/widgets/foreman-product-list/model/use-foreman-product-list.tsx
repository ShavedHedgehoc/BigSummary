import { useMemo } from 'react';
import { useIsMobile } from '@/shared/lib';
import { useRecordListSearchParams } from '@/entities/record';
import { useForemanProductListUiParams } from './use-foreman-product-list-ui-params';
import { foremanProductListColumns } from '../ui/columns';

export function useForemanProductList() {
  const isMobile = useIsMobile();

  const { data, plantData, stateData, isLoading, params, setParams } =
    useRecordListSearchParams('foreman');
  const { params: uiParams, setParams: setUiParams } = useForemanProductListUiParams();

  const columns = useMemo(() => {
    const base = [...foremanProductListColumns];
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
