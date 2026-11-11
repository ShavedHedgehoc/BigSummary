import { z } from 'zod';

export const traceCanOutputSchema = z.object({
  CanPK: z.number().int(),
  CanName: z.string(),
  CanVolume: z.number(),
  CanBarcode: z.string().nullable(),
  CanOrderValue: z.number().int().nullable(),
});

export const traceCanDataOutputSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  volume: z.number(),
  baseContain: z.string().nullable(),
  baseContainMarking: z.string().nullable(),
  stateValue: z.string().nullable(),
  state: z.string().nullable(),
  stateTime: z.coerce.date().nullable(),
  author: z.string().nullable(),
  isUpdated: z.boolean(),
  plant: z.string().nullable(),
  transit: z.boolean(),
});

export const traceCanListOutputSchema = z.array(traceCanOutputSchema);

export type ITraceCan = z.infer<typeof traceCanOutputSchema>;
export type TTraceCanListResponse = z.infer<typeof traceCanListOutputSchema>;

export const traceCanVolumeOutputSchema = z.object({
  volume: z.number(),
});

export const traceCanVolumeListOutputSchema = z.array(traceCanVolumeOutputSchema);
export type TTraceCanVolumeItem = z.infer<typeof traceCanVolumeOutputSchema>;
export type TTraceCanVolumeListResponse = z.infer<typeof traceCanVolumeListOutputSchema>;
