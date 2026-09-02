import { z } from 'zod';

export const workstationRelatedRecordListInputSchema = z.object({
  plantId: z.number().int().positive(),
  boilValue: z.string(),
  code: z.string(),
});

export type TWorkstationRelatedRecordListInput = z.infer<
  typeof workstationRelatedRecordListInputSchema
>;
