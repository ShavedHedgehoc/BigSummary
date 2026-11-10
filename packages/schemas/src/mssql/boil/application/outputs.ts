import { z } from 'zod';

export const applicationTraceBoilWghtRowOutputSchema = z.object({
  batchId: z.number().int(),
  batchName: z.string(),
  plantName: z.string().nullable(),
  batchDate: z.coerce.date().nullable(),
  productId: z.string(),
  productName: z.string().nullable(),
  planQuantity: z.coerce.number(),
  factQuantity: z.coerce.number(),
  batchYear: z.number().int(),
  batchMonth: z.string(),
  batchNumber: z.number().int(),
});

export const applicationTraceBoilWghtReportOutputSchema = z.object({
  rows: z.array(applicationTraceBoilWghtRowOutputSchema).nullable(),
  total: z.number().int(),
  totalPages: z.number().int(),
});

export type TApplicationTraceBoilWghtReportRowItem = z.infer<
  typeof applicationTraceBoilWghtRowOutputSchema
>;

export type TApplicationTraceBoilWghtReportResponse = z.infer<
  typeof applicationTraceBoilWghtReportOutputSchema
>;
