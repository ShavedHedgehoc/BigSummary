import { baseRecordParamsSchema, getMonthBounds } from '@/shared/lib';
import type { TApplicationGetDocDetailInput, TGetApplicationDocListInput } from '@repo/schemas';
import {
  type inferParserType,
  parseAsArrayOf,
  parseAsInteger,
  parseAsIsoDate,
  createSearchParamsCache,
  parseAsString,
} from 'nuqs/server';

export const docListParamsSchema = {
  startDate: parseAsIsoDate.withDefault(getMonthBounds().start),
  endDate: parseAsIsoDate.withDefault(getMonthBounds().end),
  plants: parseAsArrayOf(parseAsString).withDefault([]),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
} satisfies Record<keyof TGetApplicationDocListInput, unknown>;

export const docRecordParamsSchema = {
  ...baseRecordParamsSchema,
} satisfies Record<keyof Omit<TApplicationGetDocDetailInput, 'docId'>, unknown>;

export type DocListParams = inferParserType<typeof docListParamsSchema>;
export const docListParamsCache = createSearchParamsCache(docListParamsSchema);

// export type DocDetailParams = inferParserType<typeof docRecordParamsSchema>;
export const docRecordListParamsCache = createSearchParamsCache(docRecordParamsSchema);
