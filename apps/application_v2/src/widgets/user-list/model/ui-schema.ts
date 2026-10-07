import { parseAsString } from 'nuqs/server';

export const userListUiSchema = {
  selectedUserId: parseAsString.withDefault(''),
};
