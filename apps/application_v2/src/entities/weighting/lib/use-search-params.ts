'use client';

import { useQueryStates } from 'nuqs';
import { trpc } from '@/shared/api';
import { traceWeightingListParamsSchema } from '../model';

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

  const { data, isLoading } = trpc.application.trace.weighting.getWeightingList.useQuery(
    { ...params, getAllRows: false as const },
    {
      // placeholderData: keepPreviousData,
      staleTime: 30 * 1000,
      refetchInterval: 30 * 1000,
    },
  );
  return { plantData: plantData ?? [], data, isLoading, params, setParams };
}
