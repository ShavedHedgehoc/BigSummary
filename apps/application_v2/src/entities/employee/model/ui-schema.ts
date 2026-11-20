import { parseAsString } from 'nuqs/server';

export const employeeListUiSchema = {
  selectedEmployeeId: parseAsString.withDefault(''),
};
