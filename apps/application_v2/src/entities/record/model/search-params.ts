import { baseRecordParamsSchema } from '@/shared/lib';
import type { TApplicationGetCurrentDocInput } from '@repo/schemas';
import { createSearchParamsCache, parseAsString, parseAsArrayOf } from 'nuqs/server';

export const recordListParamsSchema = {
  ...baseRecordParamsSchema,
  plants: parseAsArrayOf(parseAsString),
} satisfies Record<keyof TApplicationGetCurrentDocInput, unknown>;

export const recordListParamsCache = createSearchParamsCache(recordListParamsSchema);
