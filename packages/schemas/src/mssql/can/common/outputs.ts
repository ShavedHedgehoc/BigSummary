import { z } from 'zod';

export const traceCanOutputSchema = z.object({
  CanPK: z.number().int(),
  CanName: z.string(),
  CanVolume: z.number(),
  CanBarcode: z.string().nullable(),
  CanOrderValue: z.number().int().nullable(),
});

export const traceCanListOutputSchema = z.array(traceCanOutputSchema);

export type ITraceCan = z.infer<typeof traceCanOutputSchema>;
export type TTraceCanListResponse = z.infer<typeof traceCanListOutputSchema>;
