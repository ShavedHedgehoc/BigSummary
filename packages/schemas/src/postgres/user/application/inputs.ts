import { applicationUserSettingsUpdateInputSchema } from '../../user-settings';
import { number, z } from 'zod';

export const getApplicationUserListInputSchema = z.object({
  name: z.string().default(''),
  nameAsc: z.boolean().default(true),
  email: z.string().default(''),
  banned: z.array(z.number()).nullish(),
  roles: z.array(z.number()).nullish(),
  limit: z.number().int().positive().default(10),
  page: z.number().int().nonnegative().default(1),
});

export const applicationUpdateUserInputSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  email: z.string(),
  user_settings: applicationUserSettingsUpdateInputSchema,
});

export const applicationChangeUserAccessInputSchema = z.object({
  id: z.number().int().positive(),
});

export const applicationResetUserPasswordInputSchema = z.object({
  id: z.number().int().positive(),
});

export const applicationChangeUserPasswordInputSchema = z.object({
  id: z.number().int().positive(),
  oldPassword: z.string().min(1),
  newPassword: z.string().min(1),
});

export const applicationDeleteUserInputSchema = z.object({
  id: z.number().int().positive(),
});

export const applicationUpdateUserRolesInputSchema = z.object({
  id: z.number().int().positive(),
  roles: z.array(number()),
});

export type TGetApplicationUserListInput = z.infer<typeof getApplicationUserListInputSchema>;
export type TApplicationUpdateUserInput = z.infer<typeof applicationUpdateUserInputSchema>;
export type TApplicationChangeUserAccessInput = z.infer<
  typeof applicationChangeUserAccessInputSchema
>;
export type TApplicationResetUserPasswordInput = z.infer<
  typeof applicationResetUserPasswordInputSchema
>;
export type TApplicationChangeUserPasswordInput = z.infer<
  typeof applicationChangeUserPasswordInputSchema
>;
export type TApplicationDeleteUserInput = z.infer<typeof applicationDeleteUserInputSchema>;
export type TApplicationUpdateUserRolesInput = z.infer<
  typeof applicationUpdateUserRolesInputSchema
>;
