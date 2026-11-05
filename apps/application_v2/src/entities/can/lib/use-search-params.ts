'use client';

import { useQueryStates } from 'nuqs';
import { trpc } from '@/shared/api';
import { keepPreviousData } from '@tanstack/react-query';
import { canDashParamsSchema } from '../model/search-params';

export function useCanDashSearchParams() {
  /* Справочники */
  const { data: plantData } = trpc.application.trace.plant.getAllPlants.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  const { data: stateData } = trpc.application.trace.canState.getAllCanStates.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  const { data: volumeData } = trpc.application.trace.can.getCanVolumesList.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  const [params, setParams] = useQueryStates(canDashParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });

  const { data, isLoading } = trpc.application.trace.can.getCanDataList.useQuery(params, {
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
    refetchInterval: 10 * 1000,
  });
  return { data, plantData, stateData, volumeData, isLoading, params, setParams };
}
