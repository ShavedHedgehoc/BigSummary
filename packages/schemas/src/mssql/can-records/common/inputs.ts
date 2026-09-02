import { z } from 'zod';

export const dashTraceCanRecordListInputSchema = z.object({
  canId: z.number().int().positive(),
  limit: z.number().int().optional(),
});

export type TGetDashTraceCanRecordListInput = z.infer<typeof dashTraceCanRecordListInputSchema>;
