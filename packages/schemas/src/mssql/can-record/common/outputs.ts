import { z } from 'zod';

export const commonTraceCanRecordOutputSchema = z.object({
  state: z.string().nullable(),
  stateValue: z.string().nullable(),
  stateTime: z.coerce.date().nullable(),
  author: z.string().nullable(),
  baseContain: z.string().nullable(),
  baseContainMarking: z.string().nullable(),
});

export const commonTraceCanRecordListOutputSchema = z.array(commonTraceCanRecordOutputSchema);

export type TCommonTraceCanRecordItem = z.infer<typeof commonTraceCanRecordOutputSchema>;
export type TCommonTraceCanRecordListResponse = z.infer<
  typeof commonTraceCanRecordListOutputSchema
>;
