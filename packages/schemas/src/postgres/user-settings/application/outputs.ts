import { z } from 'zod';

export const applicationUserSettingsOutputSchema = z.object({
  plant_id: z.number().int().nullable(),
  plant: z.string(),
});

export type TApplicationUserSettingsItem = z.infer<typeof applicationUserSettingsOutputSchema>;
