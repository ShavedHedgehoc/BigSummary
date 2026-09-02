import { z } from 'zod';

export const workstationRelatedRecordItemSchema = z.object({
  id: z.number().int(),
  conveyorId: z.number().int(),
});

export const workstationRelatedRecordListOutputSchema = z.array(workstationRelatedRecordItemSchema);
export type TWorkstationRelatedRecordItem = z.infer<typeof workstationRelatedRecordItemSchema>;
export type TWorkstationRelatedRecordListResponse = z.infer<
  typeof workstationRelatedRecordListOutputSchema
>;
