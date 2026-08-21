import { z } from 'zod';

export const getDashTracePlantByValueSchema = z.object({
    value: z.string().default(''),
});

export type TGetDashTracePlantByValueInput = z.infer<typeof getDashTracePlantByValueSchema>;
