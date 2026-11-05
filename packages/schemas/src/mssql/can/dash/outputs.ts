import { z } from 'zod';
import { traceCanDataOutputSchema, traceCanVolumeOutputSchema } from '../common';

export const dashTraceCanDataOutputSchema = traceCanDataOutputSchema.extend({});

export const dashTraceCanDataListOutputSchema = z.object({
  rows: z.array(dashTraceCanDataOutputSchema),
  total: z.number().int(),
});

export type TDashTraceCanDataItem = z.infer<typeof dashTraceCanDataOutputSchema>;
export type TDashTraceCanDataListResponse = z.infer<typeof dashTraceCanDataListOutputSchema>;

export const dashTraceCanVolumeOutputSchema = traceCanVolumeOutputSchema.extend({});

export const dashTraceCanVolumeListOutputSchema = z.array(dashTraceCanVolumeOutputSchema);
export type TDashTraceCanVolumeItem = z.infer<typeof dashTraceCanVolumeOutputSchema>;
export type TDashTraceCanVolumeListResponse = z.infer<typeof dashTraceCanVolumeListOutputSchema>;
