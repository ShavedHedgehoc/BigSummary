'use client';
import { useQueryStates } from 'nuqs';
import { trpc } from '@/shared/api';
import { keepPreviousData } from '@tanstack/react-query';
import { conveyorListParamsSchema } from '../model';

export function useConveyorListSearchParams() {
  const [params, setParams] = useQueryStates(conveyorListParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });
  const { data: conveyorListData, isLoading } =
    trpc.application.main.conveyor.getConveyorList.useQuery(params, {
      placeholderData: keepPreviousData,
      staleTime: 30 * 1000,
    });
  return { conveyorListData, isLoading, params, setParams };
}
