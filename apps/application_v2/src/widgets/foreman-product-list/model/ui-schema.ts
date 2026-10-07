import { parseAsString } from 'nuqs/server';

export const foremanProductListUiSchema = {
  selectedRecordId: parseAsString.withDefault(''),
};
