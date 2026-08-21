import { z } from 'zod';

export const getDashDocCurrentInputSchema = z.object({
  plantId: z.number(),
});

export const getDashDocDataCurrentAppInputSchema = z.object({
  current: z.boolean(),
  plantId: z.number(),
});

export const getDashDocRowInputSchema = z.object({
  recordId: z.number(),
});

export type TGetDashDocDataCurentInput = z.infer<typeof getDashDocCurrentInputSchema>;

export type TGetDashDocDataCurentAppInput = z.infer<typeof getDashDocDataCurrentAppInputSchema>;

export type TGetDashDocRowInput = z.infer<typeof getDashDocRowInputSchema>;
