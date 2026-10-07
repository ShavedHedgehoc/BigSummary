import { applicationUserSettingsOutputSchema } from '../../user-settings';
import { applicationRoleOutputSchema } from '../../role';
import { z } from 'zod';

export const applicationUserOutputSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  email: z.string(),
  banned: z.boolean(),
  roles: z.array(applicationRoleOutputSchema).nullable(),
  user_settings: applicationUserSettingsOutputSchema.nullish(),
});

export const applicationUserListOutputSchema = z.object({
  rows: z.array(applicationUserOutputSchema).nullable(),
  total: z.number().int(),
  totalPages: z.number().int(),
});

export const applicationUpdateUserOutputSchema = z.object({
  id: z.number().int().positive(),
  success: z.boolean(),
});

export const applicationChangeUserAccessOutputSchema = z.object({
  id: z.number().int().positive(),
  success: z.boolean(),
  banned: z.boolean(),
});

export const applicationResetUserPasswordOutputSchema = z.object({
  id: z.number().int().positive(),
  success: z.boolean(),
});

export const applicationChangeUserPasswordOutputSchema = z.object({
  id: z.number().int().positive(),
  success: z.boolean(),
});
export const applicationDeleteUserOutputSchema = z.object({
  id: z.number().int().positive(),
  success: z.boolean(),
});
export const applicationUpdateUserRolesOutputSchema = z.object({
  id: z.number().int().positive(),
  success: z.boolean(),
});

export type TApplicationUserItem = z.infer<typeof applicationUserOutputSchema>;
export type TApplicationUserListResponse = z.infer<typeof applicationUserListOutputSchema>;
export type TApplicationUpdateUserResponse = z.infer<typeof applicationUpdateUserOutputSchema>;
export type TApplicationChangeUserAccessResponse = z.infer<
  typeof applicationChangeUserAccessOutputSchema
>;
export type TApplicationResetUserPasswordResponse = z.infer<
  typeof applicationResetUserPasswordOutputSchema
>;
export type TApplicationChangeUserPasswordResponse = z.infer<
  typeof applicationChangeUserPasswordOutputSchema
>;
export type TApplicationDeleteUserResponse = z.infer<typeof applicationDeleteUserOutputSchema>;
export type TApplicationUpdateUserRolesResponse = z.infer<
  typeof applicationUpdateUserRolesOutputSchema
>;
