import { z } from 'zod';

export const dashTraceCanDataOutputSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  volume: z.number(),
  baseContain: z.string().nullable(),
  baseContainMarking: z.string().nullable(),
  stateValue: z.string(),
  state: z.string(),
  stateTime: z.coerce.date().nullable(),
  author: z.string().nullable(),
  isUpdated: z.boolean(),
  plant: z.string().nullable(),
  transit: z.boolean(),
});

export const dashTraceCanVolumeOutputSchema = z.object({
  volume: z.number(),
});

export const dashTraceCanVolumeListOutputSchema = z.array(dashTraceCanVolumeOutputSchema);
export const dashTraceCanDataListOutputSchema = z.array(dashTraceCanDataOutputSchema);

export type TDashTraceCanVolumeItem = z.infer<typeof dashTraceCanVolumeOutputSchema>;
export type TDashTraceCanVolumeListResponse = z.infer<typeof dashTraceCanVolumeListOutputSchema>;
export type TDashTraceCanDataItem = z.infer<typeof dashTraceCanDataOutputSchema>;
export type TDashTraceCanDataListResponse = z.infer<typeof dashTraceCanDataListOutputSchema>;
