import { applicationOccupationUpdateInputSchema } from '../../occupation';
import { z } from 'zod';

export const getApplicationEmployeeListInputSchema = z.object({
  name: z.string().default(''),
  nameAsc: z.boolean().default(true),
  occupations: z.array(z.string()).nullish(),
  limit: z.number().int().positive().default(10),
  page: z.number().int().nonnegative().default(1),
});

export const applicationUpdateEmployeeInputSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  barcode: z.string(),
  occupation: applicationOccupationUpdateInputSchema,
});

export const applicationCreateEmployeeInputSchema = z.object({
  name: z.string(),
  barcode: z.string(),
  occupation: applicationOccupationUpdateInputSchema,
});

export const applicationDeleteEmployeeInputSchema = z.object({
  id: z.number().int().positive(),
});

export type TGetApplicationEmployeeListInput = z.infer<
  typeof getApplicationEmployeeListInputSchema
>;
export type TApplicationUpdateEmployeeInput = z.infer<typeof applicationUpdateEmployeeInputSchema>;
export type TApplicationCreateEmployeeInput = z.infer<typeof applicationCreateEmployeeInputSchema>;
export type TApplicationDeleteEmployeeInput = z.infer<typeof applicationDeleteEmployeeInputSchema>;
