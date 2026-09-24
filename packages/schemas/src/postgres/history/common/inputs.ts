import { z } from 'zod';

export const commonHistoryCreateInputSchema = z.object({
  record_id: z.number().int().positive().nullable(),
  boil_value: z.string().nullable(),
  base_code: z.string().nullable(),
  code: z.string().nullable(),
  historyType: z.string().nullable(),
  userId: z.number().int().positive().nullable(),
  employeeId: z.number().int().positive().nullable(),
  note: z.string().nullable(),
  plant_id: z.number().int().positive().nullable(),
  history_note: z.string().nullable(),
});

export type TCreateHistoryInput = z.infer<typeof commonHistoryCreateInputSchema>;
