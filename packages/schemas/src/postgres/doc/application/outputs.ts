import { z } from 'zod';
import { commonHistoryOutputSchema } from '../../history';

export const applicationDocOutputSchema = z.object({
  id: z.number().int(),
  plantId: z.number().int(),
  plant: z.string().nullable(),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  recordsCount: z.number().int().nullable(),
  historiesCount: z.number().int().nullable(),
});

export const applicationDocListOutputSchema = z.object({
  rows: z.array(applicationDocOutputSchema).nullable(),
  total: z.number().int(),
  totalPages: z.number().int(),
});

export const applicationDeleteDocOutputSchema = z.object({
  success: z.boolean(),
  id: z.number().int().positive(),
});

export const applicationUploadDocOutputSchema = z.object({
  success: z.boolean(),
});

export const applicationDeleteDocRowOutputSchema = z.object({
  success: z.boolean(),
  id: z.number().int().positive(),
});

export const applicationParsedSemiproductItemSchema = z.object({
  code: z.string(),
  boil: z.string(),
  marking: z.string(),
});

export const applicationDocStatsResponseSchema = z.object({
  totalRowsPsk: z.number(),
  totalRowsKlp: z.number(),
  totalPlanPsk: z.number(),
  totalPlanKlp: z.number(),
});

export const applicationDocDetailHeaderSchema = z.object({
  id: z.number().int().positive(),
  plantId: z.number().int().positive(),
  date: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  plant: z.string().nullable(),
});

// export const applicationHistorySchema = z.object({
//   id: z.number().int().positive(),
//   value: z.string().nullable(),
//   description: z.string().nullable(),
//   note: z.string().nullable(),
//   history_note: z.string().nullable(),
//   employee: z.string().nullable(),
//   user: z.string().nullable(),
//   createdAt: z.coerce.date(),
// });

export const applicationDocDetailRowSchema = z.object({
  id: z.number().int().positive(),
  productCode: z.string(),
  marking: z.string(),
  boil: z.string(),
  plan: z.number().int(),
  fact: z.number().int(),
  apparatus: z.string(),
  bbf: z.string(),
  dm: z.string(),
  note: z.string(),
  can: z.string(),
  conveyor: z.string(),
  workshop: z.string(),
  waterBaseId: z.number().nullable(),
  historiesCount: z.number(),
  histories: z.array(commonHistoryOutputSchema).nullable(),
  isSet: z.boolean(),
  state: z.string(),
  stateValue: z.string().nullable(),
  stateTime: z.coerce.date().nullable(),
  isUpdated: z.boolean(),
  isCanDeleted: z.boolean(),
});

export const applicationDocDetailOutputSchema = z.object({
  header: applicationDocDetailHeaderSchema.nullable(),
  rows: z.array(applicationDocDetailRowSchema).nullable(),
});

export const applicationUpdateDocRowOutputSchema = z.object({
  success: z.boolean(),
  record: z.object({
    id: z.number(),
    apparatusId: z.number().nullable(),
    canId: z.number().nullable(),
    conveyorId: z.number(),
    plan: z.number(),
    note: z.string().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
  }),
});

export type TApplicationDocItem = z.infer<typeof applicationDocOutputSchema>;
export type TApplicationDocListResponse = z.infer<typeof applicationDocListOutputSchema>;
export type TApplicationDeleteDocResponse = z.infer<typeof applicationDeleteDocOutputSchema>;
export type TApplicationDeleteDocRowResponse = z.infer<typeof applicationDeleteDocRowOutputSchema>;
export type TApplicationUploadDocResponse = z.infer<typeof applicationUploadDocOutputSchema>;
export type TApplicationParsedSemiproductItem = z.infer<
  typeof applicationParsedSemiproductItemSchema
>;
export type TApplicationDocStatsResponse = z.infer<typeof applicationDocStatsResponseSchema>;
export type TApplicationDocDetailHeader = z.infer<typeof applicationDocDetailHeaderSchema>;
// export type TApplicationHistoryItem = z.infer<typeof applicationHistorySchema>;
export type TApplicationDocDetailRowItem = z.infer<typeof applicationDocDetailRowSchema>;
export type TApplicationDocDetailResponse = z.infer<typeof applicationDocDetailOutputSchema>;
export type TApplicationUpdateDocRowResponse = z.infer<typeof applicationUpdateDocRowOutputSchema>;
