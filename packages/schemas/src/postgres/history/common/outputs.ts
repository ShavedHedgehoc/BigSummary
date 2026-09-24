import { z } from 'zod';

export const commonHistoryCreateOutputSchema = z
  .object({
    id: z.number().int(),
    record_id: z.number().int().nullable(),
    boil_id: z.number().int().nullable(),
    historyTypeId: z.number().int().nullable(),
    userId: z.number().int().nullable(),
    employeeId: z.number().int().nullable(),
    note: z.string().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    note_id: z.number().int().nullable(),
    plant_id: z.number().int().nullable(),
  })
  .nullable();

export const commonHistoryOutputSchema = z.object({
  id: z.number().int().positive(),
  value: z.string().nullable(),
  description: z.string().nullable(),
  note: z.string().nullable(),
  history_note: z.string().nullable(),
  employee: z.string().nullable(),
  user: z.string().nullable(),
  createdAt: z.coerce.date(),
});

export type TCreateHistoryResponse = z.infer<typeof commonHistoryCreateOutputSchema>;
export type TCommonHistoryItem = z.infer<typeof commonHistoryOutputSchema>;
