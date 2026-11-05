import { z } from 'zod';
import { traceCanDataListInputSchema } from '../common';

export const dashTraceCanDataListFilterSchema = traceCanDataListInputSchema.extend({});

export const dashTraceCanDataListInputSchema = z.object({
  filter: dashTraceCanDataListFilterSchema,
});

export type IDashTraceCanDataListFilter = z.infer<typeof dashTraceCanDataListFilterSchema>;
export type TGetDashTraceCanDataListInput = z.infer<typeof dashTraceCanDataListInputSchema>;
