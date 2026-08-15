import { z } from 'zod';

export const getDashPlantByValueSchema = z.object({
    value: z.string().default(''),
});

export type TGetDashPlantByValueInput = z.infer<typeof getDashPlantByValueSchema>;

