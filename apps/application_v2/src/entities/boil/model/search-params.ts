import type { TGetApplicationLabBoilListInput } from '@repo/schemas';
import {
  type inferParserType,
  parseAsArrayOf,
  parseAsInteger,
  parseAsBoolean,
  createSearchParamsCache,
  parseAsString,
} from 'nuqs/server';

export const boilListParamsSchema = {
  boilAsc: parseAsBoolean.withDefault(false),
  boil: parseAsString.withDefault(''),
  baseCode: parseAsString.withDefault(''),
  marking: parseAsString.withDefault(''),
  states: parseAsArrayOf(parseAsString),
  plants: parseAsArrayOf(parseAsString).withDefault([]),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
} satisfies Record<keyof TGetApplicationLabBoilListInput, unknown>;

export type BoilListParams = inferParserType<typeof boilListParamsSchema>;
export const boilListParamsCache = createSearchParamsCache(boilListParamsSchema);
