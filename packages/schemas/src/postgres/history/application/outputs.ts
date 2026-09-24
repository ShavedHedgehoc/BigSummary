import { z } from 'zod';

export const applicationDeleteHistorySchema = z.object({
  success: z.boolean(),
  id: z.number().int().positive(),
});

export type TApplicationDeleteHistoryResponse = z.infer<typeof applicationDeleteHistorySchema>;
