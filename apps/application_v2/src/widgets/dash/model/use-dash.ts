import { useIsMobile } from '@/shared/lib';
import { useDashUiParams } from './use-dash-ui-params';
import { useRecordListSearchParams } from '@/entities/record';

export function useDash() {
  const isMobile = useIsMobile();

  const { data, plantData, isLoading, params, setParams } = useRecordListSearchParams('dash');

  const { params: uiParams, setParams: setUiParams } = useDashUiParams();

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
    hasSelectedRow,
    selectedRow,
    clearSelected,
    isMobile,
  };
}
