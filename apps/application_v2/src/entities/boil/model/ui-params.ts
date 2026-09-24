import { parseAsString } from 'nuqs/server';

export const labBoilListUiSchema = {
  selectedBoilId: parseAsString.withDefault(''),
};
