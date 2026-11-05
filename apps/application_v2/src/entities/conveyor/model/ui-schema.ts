import { parseAsString } from 'nuqs/server';

export const conveyorListUiSchema = {
  selectedConveyorId: parseAsString.withDefault(''),
};
