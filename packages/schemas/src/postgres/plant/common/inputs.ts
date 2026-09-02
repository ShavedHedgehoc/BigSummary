import { z } from 'zod';

export const getPlantByValueSchema = z.object({
  value: z.string().default(''),
});

export type TGetPlantByValueInput = z.infer<typeof getPlantByValueSchema>;
