import { useEffect, useMemo, useRef, useTransition } from 'react';
import { keepPreviousData } from '@tanstack/react-query';
import { trpc } from '@/shared/api';
import { useIsMobile } from '@/shared/lib';
import {
  baseRecordColumns,
  useLabProductListSearchParams,
  useLabProductListUiParams,
} from '@/entities/record';

export function useLabProductList() {
  const isMobile = useIsMobile();
  const [, startTransition] = useTransition();
  const isInitialAutoSelectDone = useRef(false);

  const { params, setParams } = useLabProductListSearchParams();
  const { params: uiParams, setParams: setUiParams } = useLabProductListUiParams();

  const { data: plantData } = trpc.application.main.plant.getPlantList.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  const plantId = params.plants?.[0] ?? null;
  const isEnabled = Boolean(plantId && plantId !== 'All');

  const { data: queryData, isLoading } = trpc.application.main.doc.getCurrentDoc.useQuery(params, {
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
    enabled: isEnabled,
  });

  const data = isEnabled ? queryData : null;

  const { data: stateData } = trpc.application.main.historyType.getProductHistoryTypeList.useQuery(
    undefined,
    { staleTime: Infinity, gcTime: 1000 * 60 * 60 },
  );

  useEffect(() => {
    if (isInitialAutoSelectDone.current || !plantData?.length) return;

    if (params.plants?.length) {
      isInitialAutoSelectDone.current = true;
      return;
    }

    const firstPlantId = String(plantData[0].id);
    isInitialAutoSelectDone.current = true;

    startTransition(() => {
      setParams({ plants: [firstPlantId] }, { shallow: false });
    });
  }, [plantData, params.plants, setParams]);

  const columns = useMemo(() => {
    const base = [...baseRecordColumns];
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
