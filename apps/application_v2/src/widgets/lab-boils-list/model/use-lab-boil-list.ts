import {
  LabBoilListParams,
  useLabBoilListSearchParams,
  useLabBoilListUiParams,
} from '@/entities/boil';
import { trpc } from '@/shared/api';
import { useIsMobile } from '@/shared/lib';
import { keepPreviousData } from '@tanstack/react-query';
import { useEffect, useMemo, useRef, useTransition } from 'react';
import { labBoilListColumns } from '../ui/columns';
import { ITablePaginationProps } from '@/shared/ui';

export function useLabBoilList() {
  const isMobile = useIsMobile();
  const [, startTransition] = useTransition();
  const isInitialAutoSelectDone = useRef(false);

  const { params, setParams } = useLabBoilListSearchParams();
  const { params: uiParams, setParams: setUiParams } = useLabBoilListUiParams();

  const { data: plantData } = trpc.application.main.plant.getPlantList.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  const { data: stateData } = trpc.application.main.historyType.getBoilHistoryTypeList.useQuery(
    undefined,
    {
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60,
    },
  );

  useEffect(() => {
    if (isInitialAutoSelectDone.current || !stateData?.length) return;
    if (params.states?.length) {
      isInitialAutoSelectDone.current = true;
      return;
    }
    const targetRow = stateData.find((row) => row.value === 'base_check');
    if (targetRow) {
      isInitialAutoSelectDone.current = true;
      startTransition(() => {
        setParams({ states: [String(targetRow.id)] }, { shallow: false });
      });
    }
  }, [stateData, params.states, setParams]);

  const { data, isLoading } = trpc.application.main.boil.getBoilList.useQuery(params, {
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
  });

  const columns = useMemo(() => {
    const base = [...labBoilListColumns];
    return base.filter((col) => (isMobile ? !col.meta?.hideOnMobile : !col.meta?.hideOnDesktop));
  }, [isMobile]);

  const hasSelectedRow = uiParams.selectedBoilId !== '';
  const targetId = uiParams.selectedBoilId ? Number(uiParams.selectedBoilId) : null;
  const selectedRow =
    data?.rows && targetId ? data.rows.find((row) => row.id === targetId) : undefined;

  const clearSelected = () => setUiParams({ selectedBoilId: '' });

  const paginationProps: ITablePaginationProps<LabBoilListParams> = {
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
