import type { TGetApplicationEmployeeListInput } from '@repo/schemas';
import {
  createSearchParamsCache,
  parseAsString,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  inferParserType,
} from 'nuqs/server';

export const employeeListParamsSchema = {
  name: parseAsString.withDefault(''),
  nameAsc: parseAsBoolean.withDefault(true),
  occupations: parseAsArrayOf(parseAsString),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
} satisfies Record<keyof TGetApplicationEmployeeListInput, unknown>;

export type EmployeeListParams = inferParserType<typeof employeeListParamsSchema>;
export const employeeListParamsCache = createSearchParamsCache(employeeListParamsSchema);
