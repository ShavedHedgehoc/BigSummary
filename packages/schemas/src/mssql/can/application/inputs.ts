import { z } from 'zod';

export const applicationTraceCanDataListInputSchema = z.object({
  can: z.string().default(''),
  volumes: z.array(z.string()).default([]),
  states: z.array(z.string()).default([]),
  plants: z.array(z.string()).default([]),
  transit: z.boolean().default(false),
});

export type TGetApplicationTraceCanDataListInput = z.infer<
  typeof applicationTraceCanDataListInputSchema
>;
