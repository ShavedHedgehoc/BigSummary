import { getToday } from '@/shared/lib';
import type { TApplicationTraceWeightingListInput } from '@repo/schemas';
import {
  createSearchParamsCache,
  parseAsString,
  parseAsArrayOf,
  parseAsIsoDate,
  parseAsInteger,
  parseAsBoolean,
  inferParserType,
} from 'nuqs/server';

export const traceWeightingListParamsSchema = {
  batchName: parseAsString.withDefault(''),
  productId: parseAsString.withDefault(''),
  compare: parseAsBoolean.withDefault(true),
  sortByBatch: parseAsBoolean.withDefault(false),
  startDate: parseAsIsoDate.withDefault(getToday()),
  endDate: parseAsIsoDate.withDefault(getToday()),
  plants: parseAsArrayOf(parseAsString).withDefault([]),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
  getAllRows: parseAsBoolean.withDefault(false),
} satisfies Record<keyof TApplicationTraceWeightingListInput, unknown>;

export type TraceWeightingListParams = inferParserType<typeof traceWeightingListParamsSchema>;
export const TraceWeightingListParamsCache = createSearchParamsCache(
  traceWeightingListParamsSchema,
);
