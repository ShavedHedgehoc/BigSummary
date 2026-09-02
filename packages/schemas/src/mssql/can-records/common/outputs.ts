import { z } from 'zod';

export const dashTraceCanRecordOutputSchema = z.object({
  CreateDate: z.coerce.date(),
  stateDescription: z.string().nullable(),
  authorName: z.string().nullable(),
  baseContain: z.string().nullable(),
});

export const dashTraceCanRecordListOutputSchema = z.array(dashTraceCanRecordOutputSchema);

export type TDashTraceCanRecordItem = z.infer<typeof dashTraceCanRecordOutputSchema>;
export type TDashTraceCanRecordListResponse = z.infer<typeof dashTraceCanRecordListOutputSchema>;
