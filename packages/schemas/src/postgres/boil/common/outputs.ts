// interface IBoilRow {
//   id: number;
//   value: string;
//   recordsCount: number;
//   historiesCount: number;
//   state: string;
//   state_id: number;
//   stateValue: string;
//   base_code: string;
//   base_marking: string;
//   plant: string;
// }

// interface IBoilReportData {
//   rows: IBoilReportRow[];
//   total: number;
// }
import { z } from 'zod';

export const boilDetailOutputSchema = z.object({
  id: z.number().int(),
  value: z.string(),
  recordsCount: z.number().int(),
  historiesCount: z.number().int(),
  state: z.string(),
  state_id: z.number().int().nullable(),
  stateValue: z.string().nullable(),
  base_code: z.string().nullable(),
  base_marking: z.string().nullable(),
  plant: z.string().nullable(),
});
export const boilListOutputSchema = z.object({
  rows: z.array(boilDetailOutputSchema),
  total: z.number().int(),
});

export type TBoilDetailResponse = z.infer<typeof boilDetailOutputSchema>;
export type TBoilListResponse = z.infer<typeof boilListOutputSchema>;
