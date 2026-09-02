import { z } from 'zod';

export const publicApiCounterCreateOutputSchema = z.object({
  id: z.number().int(),
  record_id: z.number().int().nullable(),
  task_uuid: z.string().nullable(),
  counter_value: z.number().int().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type TPublicApiCreateCounterResponse = z.infer<typeof publicApiCounterCreateOutputSchema>;
