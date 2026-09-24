import { z } from 'zod';

export const workstationHistoryListInputSchema = z.object({
  plantId: z.number().int().positive(),
  limit: z.number().int().optional(),
});

export type TGetWorkstationHistoryListInput = z.infer<typeof workstationHistoryListInputSchema>;
