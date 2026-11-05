import { getMonthBounds } from '@/shared/lib';
import type {
  TApplicationGetTraceInventoryDetailInput,
  TApplicationGetTraceInventoryListInput,
} from '@repo/schemas';
import {
  type inferParserType,
  parseAsArrayOf,
  parseAsInteger,
  parseAsIsoDate,
  createSearchParamsCache,
  parseAsString,
  parseAsBoolean,
} from 'nuqs/server';
import { DAYS_TO_EXPIRE_OPTIONS } from './constants';

export const inventoryListParamsSchema = {
  startDate: parseAsIsoDate.withDefault(getMonthBounds().start),
  endDate: parseAsIsoDate.withDefault(getMonthBounds().end),
  plants: parseAsArrayOf(parseAsString).withDefault([]),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
} satisfies Record<keyof TApplicationGetTraceInventoryListInput, unknown>;

export type InventoryListParams = inferParserType<typeof inventoryListParamsSchema>;
export const inventoryListParamsCache = createSearchParamsCache(inventoryListParamsSchema);

export const inventoryDetailParamsSchema = {
  productCode: parseAsString.withDefault(''),
  dayToExpireRest: parseAsArrayOf(parseAsString).withDefault([DAYS_TO_EXPIRE_OPTIONS[0]]),
  applyFilter: parseAsBoolean.withDefault(false),
} satisfies Record<keyof Omit<TApplicationGetTraceInventoryDetailInput, 'inventoryId'>, unknown>;

export type InventoryDetailParams = inferParserType<typeof inventoryDetailParamsSchema>;
export const inventoryDetailParamsCache = createSearchParamsCache(inventoryDetailParamsSchema);
