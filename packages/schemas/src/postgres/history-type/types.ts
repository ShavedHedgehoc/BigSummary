import { z } from 'zod';

export const historyStatusSchema = z.enum([
  'base_fail',
  'product_fail',
  'base_check',
  'product_check',
  'product_correct',
  'product_in_progress',
  'base_correct',
  'plug_pass',
  'product_pass',
  'product_finished',
  'base_continue',
]);

export type THistoryStatus = z.infer<typeof historyStatusSchema>;
