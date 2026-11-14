import { getTomorrow } from '@/shared/lib';
import type { TApplicationTraceWeightingListInput } from '@repo/schemas';
import {
  createSearchParamsCache,
  parseAsString,
  parseAsArrayOf,
  parseAsIsoDate,
  parseAsBoolean,
} from 'nuqs/server';

export const traceWeightingListParamsSchema = {
  batchName: parseAsString.withDefault(''),
  productId: parseAsString.withDefault(''),
  compare: parseAsBoolean.withDefault(true),
  batchDate: parseAsIsoDate.withDefault(getTomorrow()),
  plants: parseAsArrayOf(parseAsString).withDefault([]),
  excludeProductIds: parseAsArrayOf(parseAsString).withDefault([]),
} satisfies Record<keyof TApplicationTraceWeightingListInput, unknown>;

export const TraceWeightingListParamsCache = createSearchParamsCache(
  traceWeightingListParamsSchema,
);
