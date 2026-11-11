import { z } from 'zod';
import { commonTraceCanRecordOutputSchema } from '../../can-record/common';
import { traceCanDataOutputSchema, traceCanVolumeOutputSchema } from '../common';

export const applicationTraceCanDataOutputSchema = traceCanDataOutputSchema.extend({
  states: z.array(commonTraceCanRecordOutputSchema).nullable(),
});

export const applicationTraceCanDataListOutputSchema = z.object({
  rows: z.array(applicationTraceCanDataOutputSchema),
  total: z.number().int(),
});

export type TApplicationTraceCanDataItem = z.infer<typeof applicationTraceCanDataOutputSchema>;
export type TApplicationTraceCanDataListResponse = z.infer<
  typeof applicationTraceCanDataListOutputSchema
>;

export const applicationTraceCanLocationDataOutputSchema = traceCanDataOutputSchema.extend({});
export const applicationTraceCanLocationDataListOutputSchema = z.object({
  rows: z.array(applicationTraceCanLocationDataOutputSchema),
  total: z.number().int(),
});

export type TApplicationTraceCanLocationDataItem = z.infer<
  typeof applicationTraceCanLocationDataOutputSchema
>;
export type TApplicationTraceCanLocationDataListResponse = z.infer<
  typeof applicationTraceCanLocationDataListOutputSchema
>;

export const applicationTraceCanVolumeOutputSchema = traceCanVolumeOutputSchema.extend({});

export const applicationTraceCanVolumeListOutputSchema = z.array(
  applicationTraceCanVolumeOutputSchema,
);
export type TApplicationTraceCanVolumeItem = z.infer<typeof applicationTraceCanVolumeOutputSchema>;
export type TApplicationTraceCanVolumeListResponse = z.infer<
  typeof applicationTraceCanVolumeListOutputSchema
>;
