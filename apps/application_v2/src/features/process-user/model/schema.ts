import * as z from 'zod';

export const userSettingsSchema = z.object({
  plant_id: z.number().int().nullable(),
});

export const updateUserFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  user_settings: userSettingsSchema,
});

export type UpdateUserFormValues = z.infer<typeof updateUserFormSchema>;
