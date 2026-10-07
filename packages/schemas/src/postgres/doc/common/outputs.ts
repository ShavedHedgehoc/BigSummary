import { z } from 'zod';
import { recordDetailOutputSchema } from '../../record';

export const docDetailOutputSchema = z.object({
  id: z.number().int(),
  plantId: z.number().int(),
  plant: z.string().nullable(),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  records: z.array(recordDetailOutputSchema),
});

export type TDocDetailResponse = z.infer<typeof docDetailOutputSchema>;
