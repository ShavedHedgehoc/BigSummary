import { parseAsString } from 'nuqs/server';

export const traceWghtReportUiSchema = {
  selectedProductId: parseAsString.withDefault(''),
  selectedBatchId: parseAsString.withDefault(''),
};
