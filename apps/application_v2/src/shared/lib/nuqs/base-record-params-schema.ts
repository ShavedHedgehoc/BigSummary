import { parseAsString, parseAsArrayOf, parseAsBoolean } from 'nuqs/server';
export const baseRecordParamsSchema = {
  boil: parseAsString.withDefault(''),
  productCode: parseAsString.withDefault(''),
  marking: parseAsString.withDefault(''),
  conveyor: parseAsString.withDefault(''),
  haveRecord: parseAsBoolean.withDefault(false),
  boilAsc: parseAsBoolean.withDefault(false),
  states: parseAsArrayOf(parseAsString),
};
