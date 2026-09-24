import { commonHistoryOutputSchema } from '../../history';
import { z } from 'zod';

export const applicationBoilOutputSchema = z.object({
  id: z.number().int(),
  boilValue: z.string(),
  recordsCount: z.number().int(),
  historiesCount: z.number().int(),
  histories: z.array(commonHistoryOutputSchema).nullable(),
  state: z.string(),
  stateId: z.number().int().nullable(),
  stateValue: z.string().nullable(),
  baseCode: z.string().nullable(),
  baseMarking: z.string().nullable(),
  plant: z.string().nullable(),
});

export const applicationBoilListOutputSchema = z.object({
  rows: z.array(applicationBoilOutputSchema),
  total: z.number().int(),
  totalPages: z.number().int(),
});

export type TApplicationBoilItem = z.infer<typeof applicationBoilOutputSchema>;
export type TApplicationBoilListResponse = z.infer<typeof applicationBoilListOutputSchema>;
