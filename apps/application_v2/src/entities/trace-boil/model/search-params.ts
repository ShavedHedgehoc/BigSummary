import { getToday } from '@/shared/lib';
import type { TGetApplicationGetTraceBoilWghtReportInput } from '@repo/schemas';
import {
  createSearchParamsCache,
  parseAsString,
  parseAsArrayOf,
  parseAsIsoDate,
  parseAsInteger,
  parseAsBoolean,
  inferParserType,
} from 'nuqs/server';

export const traceBoilWghtReportParamsSchema = {
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
} satisfies Record<keyof TGetApplicationGetTraceBoilWghtReportInput, unknown>;

export type TraceBoilWghtReportParams = inferParserType<typeof traceBoilWghtReportParamsSchema>;
export const traceBoilWghtReportParamsCache = createSearchParamsCache(
  traceBoilWghtReportParamsSchema,
);
