import { parseAsString, parseAsBoolean } from 'nuqs/server';

export const traceWeightingListUiSchema = {
  selectedProductId: parseAsString.withDefault(''),
  selectedBatchId: parseAsString.withDefault(''),
  pendingReport: parseAsBoolean.withDefault(false),
};
