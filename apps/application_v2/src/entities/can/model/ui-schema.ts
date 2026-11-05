import { parseAsString } from 'nuqs/server';

export const canDashUiSchema = {
  selectedCanId: parseAsString.withDefault(''),
};
