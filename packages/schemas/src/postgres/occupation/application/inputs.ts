import { z } from 'zod';

export const applicationOccupationUpdateInputSchema = z.object({
  occupationId: z.number().int().nullable(),
});

export type TApplicationOccupationUpdateInput = z.infer<
  typeof applicationOccupationUpdateInputSchema
>;
