import type { TApplicationGetCurrentDocInput, TApplicationGetDocDetailInput } from '@repo/schemas';
import {
  createSearchParamsCache,
  parseAsString,
  parseAsArrayOf,
  parseAsBoolean,
} from 'nuqs/server';

export const docDetailParamsSchema = {
  boil: parseAsString.withDefault(''),
  productCode: parseAsString.withDefault(''),
  marking: parseAsString.withDefault(''),
  conveyor: parseAsString.withDefault(''),
  haveRecord: parseAsBoolean.withDefault(false),
  boilAsc: parseAsBoolean.withDefault(false),
  states: parseAsArrayOf(parseAsString).withDefault([]),
} satisfies Record<keyof Omit<TApplicationGetDocDetailInput, 'docId'>, unknown>;

export const currentDocParamsSchema = {
  boil: parseAsString.withDefault(''),
  productCode: parseAsString.withDefault(''),
  marking: parseAsString.withDefault(''),
  conveyor: parseAsString.withDefault(''),
  haveRecord: parseAsBoolean.withDefault(false),
  boilAsc: parseAsBoolean.withDefault(false),
  states: parseAsArrayOf(parseAsString).withDefault([]),
  plants: parseAsArrayOf(parseAsString).withDefault([]),
} satisfies Record<keyof TApplicationGetCurrentDocInput, unknown>;

export const docDetailParamsCache = createSearchParamsCache(docDetailParamsSchema);

export const labProductListParamsCache = createSearchParamsCache(currentDocParamsSchema);
export const foremanProductListParamsCache = createSearchParamsCache(currentDocParamsSchema);
