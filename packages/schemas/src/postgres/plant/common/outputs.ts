import { z } from 'zod';

export const plantByValueOutputSchema = z.object({
  id: z.number().int(),
  value: z.string(),
  abb: z.string(),
});

export type TPlantByValueOutput = z.infer<typeof plantByValueOutputSchema>;
