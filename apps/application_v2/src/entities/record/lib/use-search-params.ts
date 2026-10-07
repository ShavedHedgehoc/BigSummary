'use client';

import { useQueryStates } from 'nuqs';
import { trpc } from '@/shared/api';
import { keepPreviousData } from '@tanstack/react-query';
import { recordListParamsSchema } from '../model';
import { THistoryStatus } from '@repo/schemas';
import { DB_HISTORY_STATUSES } from '@/shared/constants';
import { useMemo } from 'react';
import { useUserSettings } from '@/entities/user/index.client';

type TRecordSearchMode = 'dash' | 'lab' | 'foreman';

const DEFAULT_STATES: Record<TRecordSearchMode, readonly THistoryStatus[]> = {
  dash: [] as readonly THistoryStatus[],
  lab: [DB_HISTORY_STATUSES.PRODUCT_CHECK],
  foreman: [DB_HISTORY_STATUSES.PRODUCT_PASS, DB_HISTORY_STATUSES.PRODUCT_IN_PROGRESS],
} as const;

export function useRecordListSearchParams(mode: TRecordSearchMode) {
  const { defaultPlantId, hasDefaultPlant } = useUserSettings();
  /* Справочники */
  const { data: stateData } = trpc.application.main.historyType.getProductHistoryTypeList.useQuery(
    undefined,
    { staleTime: Infinity, gcTime: 1000 * 60 * 60 },
  );

  const { data: plantData } = trpc.application.main.plant.getPlantList.useQuery(undefined, {
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
  });

  /* Значения по умолчанию */
  const targetStatusValues = DEFAULT_STATES[mode];
  const defaultStatusIds = stateData
    ? stateData.filter((row) => targetStatusValues.includes(row.value)).map((row) => String(row.id))
    : undefined;

  // const firstPlantId = plantData && plantData.length > 0 ? String(plantData[0].id) : undefined;
  // const plantIdForReplace = hasDefaultPlant ? String(defaultPlantId) : firstPlantId;
  const plantIdForReplace = useMemo(() => {
    if (hasDefaultPlant && defaultPlantId !== null) {
      return String(defaultPlantId);
    }
    if (plantData && plantData.length > 0) {
      return String(plantData[0].id);
    }
    return undefined;
  }, [hasDefaultPlant, defaultPlantId, plantData]);

  /* Мемоизировання схема */
  // const dynamicSchema = useMemo(
  //   () => ({
  //     ...recordListParamsSchema,
  //     states: recordListParamsSchema.states.withDefault(defaultStatusIds ?? []),
  //     // plants: recordListParamsSchema.plants.withDefault(firstPlantId ? [firstPlantId] : []),
  //     plants: recordListParamsSchema.plants.withDefault(
  //       plantIdForReplace ? [plantIdForReplace] : [],
  //     ),
  //   }),
  //   // [defaultStatusIds, firstPlantId],
  //   [defaultStatusIds, plantIdForReplace],
  // );
  const dynamicSchema = useMemo(() => {
    return {
      ...recordListParamsSchema,
      states: recordListParamsSchema.states.withDefault(defaultStatusIds ?? []),
      plants: recordListParamsSchema.plants.withDefault(
        plantIdForReplace ? [plantIdForReplace] : [],
      ),
    };
  }, [defaultStatusIds, plantIdForReplace]);

  /* Параметры */
  const [params, setParams] = useQueryStates(
    {
      ...dynamicSchema,
      states: recordListParamsSchema.states.withDefault(defaultStatusIds ?? []),
      plants: recordListParamsSchema.plants.withDefault(
        plantIdForReplace ? [plantIdForReplace] : [],
      ),
    },
    {
      shallow: true,
      history: 'replace',
    },
  );

  const queryParams = {
    ...params,
    states: params.states,
    plants: params.plants,
  };

  /* Основной запрос */
  const isQueryEnabled = defaultStatusIds !== undefined && plantIdForReplace !== undefined;
  const { data: recordListData, isLoading } = trpc.application.main.doc.getCurrentDoc.useQuery(
    queryParams,
    {
      placeholderData: keepPreviousData,
      staleTime: 30 * 1000,
      refetchInterval: 30 * 1000,
      enabled: isQueryEnabled,
    },
  );

  return {
    params: queryParams,
    setParams,
    data: recordListData,
    stateData: stateData ?? [],
    plantData: plantData ?? [],
    isLoading: isLoading || !isQueryEnabled,
  };
}
