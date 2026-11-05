import type { TGetApplicationConveyorListInput } from '@repo/schemas';
import {
  type inferParserType,
  parseAsArrayOf,
  parseAsInteger,
  createSearchParamsCache,
  parseAsString,
} from 'nuqs/server';

export const conveyorListParamsSchema = {
  value: parseAsString.withDefault(''),
  barcodes: parseAsArrayOf(parseAsString).withDefault([]),
  records: parseAsArrayOf(parseAsString).withDefault([]),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
} satisfies Record<keyof TGetApplicationConveyorListInput, unknown>;

export type ConveyorListParams = inferParserType<typeof conveyorListParamsSchema>;
export const conveyorListParamsCache = createSearchParamsCache(conveyorListParamsSchema);
