import { z } from 'zod';

export const applicationUpdateBaseRowSchema = z.object({
  code: z.string(),
  marking: z.string(),
});

export const applicationUpdateBaseRowValErrorSchema = z.object({
  row: z.number().int().positive(),
  field: z.string(),
  error: z.string(),
});

export const applicationUpdateBaseInputSchema = z.object({
  rows: z.array(applicationUpdateBaseRowSchema),
});

export type TApplicationUpdateBaseRowInput = z.infer<typeof applicationUpdateBaseRowSchema>;
export type TApplicationUpdateBaseRowValError = z.infer<
  typeof applicationUpdateBaseRowValErrorSchema
>;
export type TApplicationUpdateBaseInput = z.infer<typeof applicationUpdateBaseInputSchema>;
