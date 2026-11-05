'use client';

import { useQueryStates } from 'nuqs';
import { inventoryDetailParamsSchema, inventoryListParamsSchema } from '../model';
import { trpc } from '@/shared/api';
import { keepPreviousData } from '@tanstack/react-query';

export function useInventoryListSearchParams() {
  /* Справочники */
  const { data: plantData } = trpc.application.trace.plant.getAllPlants.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  const [params, setParams] = useQueryStates(inventoryListParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });

  const { data, isLoading } = trpc.application.trace.inventory.getInventoryList.useQuery(params, {
    placeholderData: keepPreviousData,
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
  });
  return { plantData: plantData ?? [], data, isLoading, params, setParams };
}

export function useInventoryDetailSearchParams() {
  const [params, setParams] = useQueryStates(inventoryDetailParamsSchema, {
    shallow: true,
    history: 'replace',
    clearOnDefault: true,
  });
  return { params, setParams };
}
