import { z } from 'zod';

export const workstationHistoryOutputSchema = z.object({
  id: z.number().int(),
  createdAt: z.coerce.date(),
  boil: z.string().nullable(),
  product: z.string().nullable(),
  base: z.string().nullable(),
  historyType: z.string().nullable(),
  employee: z.string().nullable(),
});

export const workstationHistoryListOutputSchema = z.array(workstationHistoryOutputSchema);

export const workstationHistoryCreateOutputSchema = z
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

export type TWorkstationHistoryItem = z.infer<typeof workstationHistoryOutputSchema>;
export type TWorkstationHistoryListResponse = z.infer<typeof workstationHistoryListOutputSchema>;
export type TWorkstationCreateHistoryResponse = z.infer<
  typeof workstationHistoryCreateOutputSchema
>;
