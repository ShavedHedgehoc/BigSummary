import { z } from 'zod';

export const applicationUpdateBaseOutputSchema = z.object({
  success: z.boolean(),
});

export type TApplicationUpdateBaseResponse = z.infer<typeof applicationUpdateBaseOutputSchema>;
