import { z } from 'zod';

export const traceCanDataListInputSchema = z.object({
  can: z.string().default(''),
  volumes: z.array(z.number()).default([]),
  states: z.array(z.number()).default([]),
  plants: z.array(z.number()).default([]),
  transit: z.boolean().default(false).optional(),
});

export type TGetTraceCanDataListInput = z.infer<typeof traceCanDataListInputSchema>;
