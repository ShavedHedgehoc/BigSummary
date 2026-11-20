import { applicationOccupationListItemSchema } from '../../occupation';
import { z } from 'zod';

export const applicationEmployeeOutputSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  barcode: z.string(),
  isCanDelete: z.boolean(),
  occupation: applicationOccupationListItemSchema.nullable(),
});

export const applicationEmployeeListOutputSchema = z.object({
  rows: z.array(applicationEmployeeOutputSchema).nullable(),
  total: z.number().int(),
  totalPages: z.number().int(),
});

export const applicationUpdateEmployeeOutputSchema = z.object({
  id: z.number().int().positive(),
  success: z.boolean(),
});

export const applicationCreateEmployeeOutputSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  barcode: z.string(),
});

export const applicationDeleteEmployeeOutputSchema = z.object({
  id: z.number().int().positive(),
  success: z.boolean(),
});

export type TApplicationEmployeeItem = z.infer<typeof applicationEmployeeOutputSchema>;
export type TApplicationEmployeeListResponse = z.infer<typeof applicationEmployeeListOutputSchema>;
export type TApplicationUpdateEmployeeResponse = z.infer<
  typeof applicationUpdateEmployeeOutputSchema
>;

export type TApplicationCreateEmployeeResponse = z.infer<
  typeof applicationCreateEmployeeOutputSchema
>;

export type TApplicationDeleteEmployeeResponse = z.infer<
  typeof applicationDeleteEmployeeOutputSchema
>;
