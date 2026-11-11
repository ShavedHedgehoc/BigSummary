'use client';

import { useQueryStates } from 'nuqs';

import { trpc } from '@/shared/api';
// import { keepPreviousData } from '@tanstack/react-query';
import { traceBoilWghtReportParamsSchema } from '../model';

export function useTraceBoilWghtReportSearchParams() {
  /* Справочники */
  const { data: plantData } = trpc.application.trace.plant.getAllPlants.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  const [params, setParams] = useQueryStates(traceBoilWghtReportParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });

  const { data, isLoading } = trpc.application.trace.boil.getWghtReport.useQuery(params, {
    // placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });
  return { plantData: plantData ?? [], data, isLoading, params, setParams };
}
