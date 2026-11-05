import { z } from 'zod';

export const canStateSchema = z.enum([
  'can_from_product',
  'can_washed',
  'can_ready',
  'can_carantine',
  'can_need_wash',
  'can_correct',
  'can_desinfected',
]);

export type TCanState = z.infer<typeof canStateSchema>;
