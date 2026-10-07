import type { TGetApplicationUserListInput } from '@repo/schemas';
import {
  createSearchParamsCache,
  parseAsString,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  inferParserType,
} from 'nuqs/server';

export const userListParamsSchema = {
  name: parseAsString.withDefault(''),
  nameAsc: parseAsBoolean.withDefault(false),
  email: parseAsString.withDefault(''),
  // banned: parseAsArrayOf(parseAsString).withDefault([]),
  // roles: parseAsArrayOf(parseAsString).withDefault([]),
  banned: parseAsArrayOf(parseAsInteger),
  roles: parseAsArrayOf(parseAsInteger),
  limit: parseAsInteger.withDefault(10),
  page: parseAsInteger.withDefault(1),
} satisfies Record<keyof TGetApplicationUserListInput, unknown>;

export type UserListParams = inferParserType<typeof userListParamsSchema>;
export const userListParamsCache = createSearchParamsCache(userListParamsSchema);
