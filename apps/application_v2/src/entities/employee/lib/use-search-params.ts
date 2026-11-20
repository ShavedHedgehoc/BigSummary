'use client';
import { useQueryStates } from 'nuqs';
import { trpc } from '@/shared/api';
import { keepPreviousData } from '@tanstack/react-query';
import { employeeListParamsSchema } from '../model';

export function useEmployeeListSearchParams() {
  const { data: occupationData } = trpc.application.main.occupation.getOccupationList.useQuery(
    undefined,
    {
      staleTime: Infinity,
      gcTime: 1000 * 60 * 60,
    },
  );
  const [params, setParams] = useQueryStates(employeeListParamsSchema, {
    shallow: false,
    history: 'replace',
    clearOnDefault: true,
  });

  const { data: employeeListData, isLoading } =
    trpc.application.main.employee.getEmployeeList.useQuery(params, {
      placeholderData: keepPreviousData,
      staleTime: 30 * 1000,
    });
  return { occupationData: occupationData ?? [], employeeListData, isLoading, params, setParams };
}
