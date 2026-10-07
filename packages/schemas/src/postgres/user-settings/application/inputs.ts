import { z } from 'zod';

export const applicationUserSettingsUpdateInputSchema = z.object({
  plant_id: z.number().int(),
});

export type TApplicationUserSettingsUpdateInput = z.infer<
  typeof applicationUserSettingsUpdateInputSchema
>;
