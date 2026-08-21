import { z } from 'zod';

export const tracePlantOutputSchema = z.object({
    PlantPK: z.number().int(),
    PlantName: z.string(),
    PlantAlias: z.string(),
});

export const tracePlantListOutputSchema = z.array(tracePlantOutputSchema)

export type ITracePlant = z.infer<typeof tracePlantOutputSchema>;
export type TTracePlantListResponse = z.infer<typeof tracePlantListOutputSchema>;
