import { z } from 'zod';

// ==========================================
// 1. Вспомогательные схемы нижнего уровня
// ==========================================

export const semiProductSchema = z.object({
  code: z.string(),
  marking: z.string(),
  boil_value: z.string(),
});

export const regulationSchema = z.object({
  org_base_min_weight: z.string().nullable(),
  org_base_max_weight: z.string().nullable(),
  water_base_min_weight: z.string().nullable(),
  water_base_max_weight: z.string().nullable(),
  per_box: z.number().int(),
  box_per_row: z.number().int(),
  row_on_pallet: z.number().int(),
  gasket: z.string(),
  seal: z.boolean(),
  technician_note: z.string().nullable(),
  packaging_note: z.string().nullable(),
  inc_color: z.string().nullable(),
  marking_feature: z.string().nullable(),
  marking_sample_value: z.string().nullable(),
});

// ==========================================
// 2. Схема для RecordDetail
// ==========================================

export const recordDetailOutputSchema = z.object({
  id: z.number().int(),
  productId: z.string(),
  product: z.string(),
  boil: z.string(),
  plan: z.number(),
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
  regulation: regulationSchema,
  water_base_id: z.number().nullable(),
  plant_id: z.number().int(),
  history_note: z.string().nullable(),
});

// ==========================================
// 3. Схема для IDocRow
// ==========================================

// export const docRowSchema = z.object({
//     id: z.number().int(),
//     productId: z.string(),
//     product: z.string(),
//     boil: z.string(),
//     plan: z.number(),
//     fact: z.number(),
//     apparatus: z.string(),
//     bbf: z.string(),
//     dm: z.string(),
//     note: z.string(),
//     can: z.string(),
//     conveyor: z.string(),
//     workshop: z.string(),
//     historiesCount: z.number().int(),
//     state: z.string(),
//     stateValue: z.string(),
//     stateTime: z.coerce.date(),
//     isSet: z.boolean(),
//     isUpdated: z.boolean(),
// });

// ==========================================
// 4. Схема для SummaryResponse (Главный ответ)
// ==========================================

export const docDetailOutputSchema = z.object({
  id: z.number().int(),
  plantId: z.number().int(),
  plant: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  records: z.array(recordDetailOutputSchema),
});

export type TSemiProduct = z.infer<typeof semiProductSchema>;
export type TRegulation = z.infer<typeof regulationSchema>;
export type TRecordDetailResponse = z.infer<typeof recordDetailOutputSchema>;
// export type IDocRowType = z.infer<typeof docRowSchema>;
export type TDocDetailResponse = z.infer<typeof docDetailOutputSchema>;
