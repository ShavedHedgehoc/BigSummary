import { z } from 'zod';

export const dashPlantByValueOutputSchema = z.object({
  id: z.number().int(),
  value: z.string(),
  abb: z.string(),
});

export type TDashPlantByValueOutput = z.infer<typeof dashPlantByValueOutputSchema>;
