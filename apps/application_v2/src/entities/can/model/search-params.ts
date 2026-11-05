import { TGetApplicationTraceCanDataListInput } from '@repo/schemas';
import { parseAsArrayOf, parseAsString, parseAsBoolean } from 'nuqs/server';

export const canDashParamsSchema = {
  can: parseAsString.withDefault(''),
  states: parseAsArrayOf(parseAsString).withDefault([]),
  plants: parseAsArrayOf(parseAsString).withDefault([]),
  volumes: parseAsArrayOf(parseAsString).withDefault([]),
  transit: parseAsBoolean.withDefault(false),
} satisfies Record<keyof TGetApplicationTraceCanDataListInput, unknown>;
