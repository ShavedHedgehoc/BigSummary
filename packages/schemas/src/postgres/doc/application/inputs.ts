import { z } from 'zod';

export const getApplicationDocListInputSchema = z.object({
  startDate: z.coerce.date().default(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }),
  endDate: z.coerce.date().default(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0);
  }),
  plants: z.array(z.string()).nullish(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export const applicationDeleteDocInputSchema = z.object({
  id: z.number().int().positive(),
});

export const applicationDeleteDocRowInputSchema = z.object({
  id: z.number().int().positive(),
});

export const applicationUploadDocRecordRowSchema = z.object({
  code1C: z.string(),
  product: z.string(),
  serie: z.string(),
  batch: z.string(),
  apparatus: z.string(),
  can: z.string(),
  conveyor: z.string(),
  plan: z.string(),
  bbf: z.string(),
  note: z.string(),
  workshop: z.string(),
  boil1: z.string(),
  boil2: z.string(),
  semi_product: z.string(),
  org_base_min_weight: z.string(),
  org_base_max_weight: z.string(),
  water_base_min_weight: z.string(),
  water_base_max_weight: z.string(),
  per_box: z.string(),
  box_per_row: z.string(),
  row_on_pallet: z.string(),
  gasket: z.string(),
  seal: z.string(),
  technician_note: z.string(),
  packaging_note: z.string(),
  marking_sample: z.string(),
  marking_feature: z.string(),
  ink_color: z.string(),
  dm: z.string(),
});

export const applicationUploadDocRecordRowValError = z.object({
  row: z.number().int().positive(),
  field: z.string(),
  error: z.string(),
});

export const applicationUploadDocInputSchema = z.object({
  plantId: z.number(),
  summaryDate: z.coerce.date(),
  update: z.boolean(),
  rows: z.array(applicationUploadDocRecordRowSchema),
});

export const applicationGetDocStatsInputSchema = z.object({
  startDate: z.coerce.date().default(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  }),
  endDate: z.coerce.date().default(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0);
  }),
});

export const applicationGetDocDetailInputSchema = z.object({
  docId: z.number(),
  boil: z.string().nullable(),
  productCode: z.string().nullable(),
  marking: z.string().nullable(),
  conveyor: z.string().nullable(),
  haveRecord: z.boolean().default(false),
  boilAsc: z.boolean().default(false),
  states: z.array(z.string()).nullish(),
});

export const applicationGetCurrentDocInputSchema = z.object({
  boil: z.string().nullable(),
  productCode: z.string().nullable(),
  marking: z.string().nullable(),
  conveyor: z.string().nullable(),
  haveRecord: z.boolean().default(false),
  boilAsc: z.boolean().default(false),
  states: z.array(z.string()).nullish(),
  plants: z.array(z.string()).nullish(),
});

export const applicationUpdateDocRowInputSchema = z.object({
  id: z.number(),
  apparatus: z.string(),
  can: z.string(),
  conveyor: z.string(),
  plan: z.int().positive(),
  note: z.string().nullable(),
});

export type TApplicationDeleteDocInput = z.infer<typeof applicationDeleteDocInputSchema>;
export type TApplicationDeleteDocRowInput = z.infer<typeof applicationDeleteDocRowInputSchema>;
export type TApplicationUpdateDocRowInput = z.infer<typeof applicationUpdateDocRowInputSchema>;

export type TGetApplicationDocListInput = z.infer<typeof getApplicationDocListInputSchema>;
export type TApplicationUploadDocRecordRowInput = z.infer<
  typeof applicationUploadDocRecordRowSchema
>;
export type TApplicationUploadDocRecordRowValError = z.infer<
  typeof applicationUploadDocRecordRowValError
>;
export type TApplicationUploadDocInput = z.infer<typeof applicationUploadDocInputSchema>;
export type TApplicationGetDocStatsInput = z.infer<typeof applicationGetDocStatsInputSchema>;

export type TApplicationGetDocDetailInput = z.infer<typeof applicationGetDocDetailInputSchema>;
export type TApplicationGetCurrentDocInput = z.infer<typeof applicationGetCurrentDocInputSchema>;
