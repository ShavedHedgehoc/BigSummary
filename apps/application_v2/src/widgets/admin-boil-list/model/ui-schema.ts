import { parseAsString } from 'nuqs/server';

export const adminBoilListUiSchema = {
  selectedBoilId: parseAsString.withDefault(''),
};
