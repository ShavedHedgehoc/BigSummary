import { z } from 'zod';

export const applicationPlantListItemSchema = z.object({
  id: z.number().int(),
  value: z.string(),
});

export const applicationPlantListOutputSchema = z.array(applicationPlantListItemSchema).nullable();

export type TApplicationPlantListItem = z.infer<typeof applicationPlantListItemSchema>;
export type TApplicationPlantListResponse = z.infer<typeof applicationPlantListOutputSchema>;
