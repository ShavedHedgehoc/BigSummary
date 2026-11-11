import { useIsMobile } from '@/shared/lib';
import { useCanDashSearchParams, useCanDashUiParams } from '@/entities/can';

export function useCanDash() {
  const isMobile = useIsMobile();

  const { data, isLoading, params, setParams } = useCanDashSearchParams();

  const { params: uiParams, setParams: setUiParams } = useCanDashUiParams();

  const hasSelectedRow = uiParams.selectedCanId !== '';
  const targetId = uiParams.selectedCanId ? Number(uiParams.selectedCanId) : null;
  const selectedRow =
    data?.rows && targetId ? data.rows.find((row) => row.id === targetId) : undefined;

  const clearSelected = () => setUiParams({ selectedCanId: '' });
  return {
    params,
    setParams,
    setUiParams,
    data,
    isLoading,

    hasSelectedRow,
    selectedRow,
    clearSelected,
    isMobile,
  };
}
