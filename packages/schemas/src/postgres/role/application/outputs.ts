import { z } from 'zod';

export const applicationRoleOutputSchema = z.object({
  id: z.number().int(),
  value: z.string(),
  description: z.string(),
});

export const applicationRoleListOutputSchema = z.array(applicationRoleOutputSchema).nullable();

export type TApplicationRoleItem = z.infer<typeof applicationRoleOutputSchema>;
export type TApplicationRoleListResponse = z.infer<typeof applicationRoleListOutputSchema>;
