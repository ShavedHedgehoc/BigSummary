import { parseAsString, parseAsBoolean } from 'nuqs/server';

export const traceWghtReportUiSchema = {
  selectedProductId: parseAsString.withDefault(''),
  selectedBatchId: parseAsString.withDefault(''),
  pendingReport: parseAsBoolean.withDefault(false),
};
