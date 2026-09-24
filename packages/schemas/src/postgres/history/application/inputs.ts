import { z } from 'zod';

export const applicationDeleteHistoryInputSchema = z.object({
  id: z.number().int().positive(),
});

export type TApplicationDeleteHistoryInput = z.infer<typeof applicationDeleteHistoryInputSchema>;
