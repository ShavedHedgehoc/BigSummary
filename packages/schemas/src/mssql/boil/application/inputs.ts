import { z } from 'zod';

export const applicationUploadTraceBoilRowSchema = z.object({
  date: z.string().regex(/^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/, {
    message: 'Дата в файле должна быть в формате ДД.ММ.ГГГГ (например, 02.11.2026)',
  }),
  fin_productid: z.string(),
  marking: z.string(),
  batch: z.string(),
  apparatus: z.string(),
  plan: z.string().regex(/^(?:[1-9]\d*|0)(?:\.\d{1,5})?$/, {
    message: 'План должен быть положительным числом с максимум 5 знаками после запятой',
  }),
  productid: z.string(),
  productname: z.string(),
  quantity: z.string(),
  plant: z.string(),
});

export const applicationUploadTraceBoilRowValErrorSchema = z.object({
  row: z.number().int().positive(),
  field: z.string(),
  error: z.string(),
});

const traceBoilRowSchema = z.object({
  productid: z.string(),
  productname: z.string(),
  quantity: z.string().regex(/^(?:[1-9]\d*|0)(?:[\.,]\d{1,5})?$/, {
    message: 'Количество должно быть положительным числом (макс. 5 знаков после запятой/точки)',
  }),
});

const traceBoilAttributesSchema = z.object({
  apparatus: z.string(),
  batch: z.string().regex(/(^[1-9][0-9]{0,3}[A-L]\d{1,2}[RSZX]?$|^-+$)/, {
    message: "Шаблон партии не совпадает (ожидается номер варки или '-')",
  }),
  date: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {
    message: 'На бэкенд должна передаваться дата в формате YYYY-MM-DD',
  }),
  fin_productid: z.string(),
  marking: z.string(),
  plan: z.string().regex(/^(?:[1-9]\d*|0)(?:\.\d{1,5})?$/, {
    message: 'План должен быть положительным числом с максимум 5 знаками после запятой',
  }),
  plant: z.string().regex(/^[ПК]$/, { message: "Допустимы значения 'П' или 'К'" }),
});

const batchRecordSchema = z.object({
  _attributes: traceBoilAttributesSchema,
  row: z.array(traceBoilRowSchema),
});

export const applicationUploadTraceBoilInputSchema = z.object({
  document: z.object({
    batch_record: batchRecordSchema,
  }),
});

export type TApplicationUploadTraceBoilRowInput = z.infer<
  typeof applicationUploadTraceBoilRowSchema
>;
export type TApplicationUploadTraceBoilRowValError = z.infer<
  typeof applicationUploadTraceBoilRowValErrorSchema
>;
export type TApplicationUploadTraceBoilInput = z.infer<
  typeof applicationUploadTraceBoilInputSchema
>;

export type TBatchRecord = z.infer<typeof batchRecordSchema>;
