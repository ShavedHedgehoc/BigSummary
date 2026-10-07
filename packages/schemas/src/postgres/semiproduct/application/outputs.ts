import { z } from 'zod';

export const semiProductSchema = z.object({
  code: z.string(),
  marking: z.string(),
  boil_value: z.string(),
});

export type TSemiProduct = z.infer<typeof semiProductSchema>;
