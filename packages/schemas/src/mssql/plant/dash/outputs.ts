import { z } from 'zod';

export const dashTracePlantByValueOutputSchema = z.object({
    PlantPK: z.number().int(),
    PlantName: z.string(),
    PlantAlias: z.string(),
});

export type TDashTracePlantByValueOutput = z.infer<typeof dashTracePlantByValueOutputSchema>;
