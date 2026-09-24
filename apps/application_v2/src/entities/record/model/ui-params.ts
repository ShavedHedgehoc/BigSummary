import { parseAsBoolean, parseAsString } from 'nuqs/server';

export const docDetailUiSchema = {
  selectedRecordId: parseAsString.withDefault(''),
  addHistoryRecord: parseAsBoolean.withDefault(false),
};
