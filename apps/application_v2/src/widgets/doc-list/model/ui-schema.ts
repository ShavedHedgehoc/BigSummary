import { parseAsBoolean, parseAsInteger } from 'nuqs/server';

export const docListUiSchema = {
  'view-errors': parseAsBoolean.withDefault(false),
  deleteId: parseAsInteger,
};
