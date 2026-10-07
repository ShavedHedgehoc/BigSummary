'use client';

import { useQueryStates } from 'nuqs';
import { trpc } from '@/shared/api';
import { boilListParamsSchema } from '../model';
import { keepPreviousData } from '@tanstack/react-query';
import { THistoryStatus } from '@repo/schemas';
import { DB_HISTORY_STATUSES } from '@/shared/constants';
import { useMemo } from 'react';
import { useUserSettings } from '@/entities/user/index.client';

type TBoilSearchMode = 'lab' | 'technologist';

const DEFAULT_STATES: Record<TBoilSearchMode, THistoryStatus[]> = {
  lab: [DB_HISTORY_STATUSES.BASE_CHECK],
  technologist: [],
} as const;

export function useBoilListSearchParams(mode: TBoilSearchMode) {
  const { defaultPlantId, hasDefaultPlant } = useUserSettings();
  /* Справочники */
  const { data: stateData } = trpc.application.main.historyType.getBoilHistoryTypeList.useQuery(
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
  //     ...boilListParamsSchema,
  //     states: boilListParamsSchema.states.withDefault(defaultStatusIds ?? []),
  //     plants: boilListParamsSchema.plants.withDefault(firstPlantId ? [firstPlantId] : []),
  //   }),
  //   [defaultStatusIds, firstPlantId],
  // );
  const dynamicSchema = useMemo(
    () => ({
      ...boilListParamsSchema,
      states: boilListParamsSchema.states.withDefault(defaultStatusIds ?? []),
      plants: boilListParamsSchema.plants.withDefault(plantIdForReplace ? [plantIdForReplace] : []),
    }),
    [defaultStatusIds, plantIdForReplace],
  );

  /* Параметры */
  const [params, setParams] = useQueryStates(
    {
      ...dynamicSchema,
      states: boilListParamsSchema.states.withDefault(defaultStatusIds ?? []),
      // plants: boilListParamsSchema.plants.withDefault(firstPlantId ? [firstPlantId] : []),
      plants: boilListParamsSchema.plants.withDefault(plantIdForReplace ? [plantIdForReplace] : []),
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
  const { data: boilListData, isLoading } = trpc.application.main.boil.getBoilList.useQuery(
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
    data: boilListData,
    stateData: stateData ?? [],
    plantData: plantData ?? [],
    isLoading: isLoading || !isQueryEnabled,
  };
}
