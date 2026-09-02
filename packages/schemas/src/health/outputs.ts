import { z } from 'zod';

export const healthCheckOutputSchema = z.object({
  status: z.string(),
});

export type THealthCheckOutput = z.infer<typeof healthCheckOutputSchema>;
