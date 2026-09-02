import { z } from 'zod';

export const workstationHistoryListInputSchema = z.object({
  plantId: z.number().int().positive(),
  limit: z.number().int().optional(),
});

export const workstationHistoryCreateInputSchema = z.object({
  record_id: z.number().int().positive().nullable(),
  boil_value: z.string().nullable(),
  base_code: z.string().nullable(),
  code: z.string().nullable(),
  historyType: z.string().nullable(),
  userId: z.number().int().positive().nullable(),
  employeeId: z.number().int().positive().nullable(),
  note: z.string().nullable(),
  plant_id: z.number().int().positive().nullable(),
});

export type TGetWorkstationHistoryListInput = z.infer<typeof workstationHistoryListInputSchema>;
export type TCreateWorkstationHistoryInput = z.infer<typeof workstationHistoryCreateInputSchema>;
