'use client';

import { useQueryStates } from 'nuqs';
import { docListParamsSchema, docRecordParamsSchema } from '../model';
import { trpc } from '@/shared/api';
import { keepPreviousData } from '@tanstack/react-query';

export function useDocListSearchParams() {
  /* Справочники */
  const { data: plantData } = trpc.application.main.plant.getPlantList.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  const [params, setParams] = useQueryStates(docListParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });

  const { data, isLoading } = trpc.application.main.doc.getDocList.useQuery(params, {
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });
  return { plantData: plantData ?? [], data, isLoading, params, setParams };
}

const docDetailWithDefaultsSchema = {
  ...docRecordParamsSchema,
  states: docRecordParamsSchema.states.withDefault([]),
};

export function useDocDetailSearchParams() {
  const [params, setParams] = useQueryStates(docDetailWithDefaultsSchema, {
    shallow: true,
    history: 'replace',
    clearOnDefault: true,
  });
  return { params, setParams };
}
