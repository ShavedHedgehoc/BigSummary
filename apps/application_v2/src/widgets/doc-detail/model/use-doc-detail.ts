import {
  useDocDetailSearchParams,
  useDocDetailUiParams,
  baseRecordColumns,
} from '@/entities/record';
import { trpc } from '@/shared/api';
import { useIsMobile } from '@/shared/lib';
import { keepPreviousData } from '@tanstack/react-query';
import { useMemo } from 'react';

export function useDocDetail(docId?: number) {
  const isMobile = useIsMobile();
  const { params, setParams } = useDocDetailSearchParams();
  const { params: uiParams, setParams: setUiParams } = useDocDetailUiParams();

  const queryArgs = useMemo(() => {
    if (!docId) return null;
    return { docId, ...params };
  }, [docId, params]);

  const { data, isLoading } = trpc.application.main.doc.getDetail.useQuery(queryArgs!, {
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
    enabled: !!queryArgs,
  });

  const { data: stateData } = trpc.application.main.historyType.getProductHistoryTypeList.useQuery(
    undefined,
    { staleTime: Infinity, gcTime: 1000 * 60 * 60 },
  );

  const hasSelectedRow = uiParams.selectedRecordId !== '';

  const columns = useMemo(() => {
    const base = [...baseRecordColumns];
    return base.filter((col) => (isMobile ? !col.meta?.hideOnMobile : !col.meta?.hideOnDesktop));
  }, [isMobile]);

  const targetId = uiParams.selectedRecordId ? Number(uiParams.selectedRecordId) : null;
  const selectedRow =
    data?.rows && targetId ? data.rows.find((row) => row.id === targetId) : undefined;
  const clearSelected = () => setUiParams({ selectedRecordId: '' });

  return {
    isMobile,
    params,
    setParams,
    setUiParams,
    isLoading,
    hasSelectedRow,
    data,
    stateData,
    columns,
    selectedRow,
    clearSelected,
  };
}
