import { parseAsBoolean, parseAsString } from 'nuqs/server';

export const labProductListUiSchema = {
  selectedRecordId: parseAsString.withDefault(''),
  addHistoryRecord: parseAsBoolean.withDefault(false),
};
