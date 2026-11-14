'use client';

import { useQueryStates } from 'nuqs';
import { trpc } from '@/shared/api';
import { traceWeightingListParamsSchema } from '../model';
import { keepPreviousData } from '@tanstack/react-query';

export function useWeightingListSearchParams() {
  /* Справочники */
  const { data: plantData } = trpc.application.trace.plant.getAllPlants.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  const [params, setParams] = useQueryStates(traceWeightingListParamsSchema, {
    shallow: true,
    history: 'replace',
    clearOnDefault: true,
  });

  const { data, isLoading, isFetching } =
    trpc.application.trace.weighting.getWeightingList.useQuery(params, {
      placeholderData: keepPreviousData,
      staleTime: 30 * 1000,
      refetchInterval: 30 * 1000,
    });
  return { plantData: plantData ?? [], data, isLoading, isFetching, params, setParams };
}
