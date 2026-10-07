import { z } from 'zod';
import { semiProductSchema } from '../../semiproduct';
import { regulationSchema } from '../../regulation';

export const recordDetailOutputSchema = z.object({
  id: z.number().int(),
  productId: z.string(),
  product: z.string(),
  boil: z.string(),
  plan: z.number().int(),
  fact: z.number().nullable(),
  apparatus: z.string(),
  bbf: z.string(),
  dm: z.string(),
  note: z.string(),
  can: z.string(),
  conveyor: z.string(),
  workshop: z.string(),
  historiesCount: z.number().int(),
  state: z.string(),
  stateValue: z.string().nullable(),
  stateTime: z.coerce.date().nullable(),
  isSet: z.boolean(),
  isUpdated: z.boolean(),
  semiProducts: z.array(semiProductSchema).default([]),
  regulation: regulationSchema.nullable(),
  water_base_id: z.number().nullable(),
  plant_id: z.number().int(),
  history_note: z.string().nullable(),
});

export type TRecordDetailResponse = z.infer<typeof recordDetailOutputSchema>;
