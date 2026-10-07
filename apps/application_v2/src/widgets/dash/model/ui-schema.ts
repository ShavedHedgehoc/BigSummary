import { parseAsString } from 'nuqs/server';

export const dashUiSchema = {
  selectedRecordId: parseAsString.withDefault(''),
};
