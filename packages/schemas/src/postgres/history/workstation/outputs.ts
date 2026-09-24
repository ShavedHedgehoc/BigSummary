import { z } from 'zod';

export const workstationHistoryOutputSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  boil: z.string().nullable(),
  product: z.string().nullable(),
  base: z.string().nullable(),
  historyType: z.string().nullable(),
  employee: z.string().nullable(),
});

export const workstationHistoryListOutputSchema = z.array(workstationHistoryOutputSchema);

export type TWorkstationHistoryItem = z.infer<typeof workstationHistoryOutputSchema>;
export type TWorkstationHistoryListResponse = z.infer<typeof workstationHistoryListOutputSchema>;
