import { z } from 'zod';

export const publicApiCounterCreateInputSchema = z.object({
  record_id: z.number().int().positive(),
  task_uid: z.string(),
  counter_value: z.number().int().positive(),
  finished: z.boolean(),
});

export type TCreatePublicApiCounterInput = z.infer<typeof publicApiCounterCreateInputSchema>;
