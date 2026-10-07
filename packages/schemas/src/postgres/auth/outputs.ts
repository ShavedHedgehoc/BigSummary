import { z } from 'zod';
import { applicationUserSettingsOutputSchema } from '../user-settings';

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  roles: z.array(z.string()),
  settings: applicationUserSettingsOutputSchema,
});

export const loginResponseSchema = z.object({
  user: userSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const loginTrpcResponseSchema = z.object({
  user: userSchema,
});

export type TRegisteredUser = z.infer<typeof userSchema>;
export type TLoginResponse = z.infer<typeof loginResponseSchema>;
export type TLoginTrpcResponse = z.infer<typeof loginTrpcResponseSchema>;
