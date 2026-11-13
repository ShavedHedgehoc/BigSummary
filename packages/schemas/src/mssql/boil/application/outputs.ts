import { z } from 'zod';

export const applicationUploadTraceBoilOutputSchema = z.object({
  value: z.number().nullable(),
});

// Inferred Types
export type TApplicationUploadTraceBoilResponse = z.infer<
  typeof applicationUploadTraceBoilOutputSchema
>;
