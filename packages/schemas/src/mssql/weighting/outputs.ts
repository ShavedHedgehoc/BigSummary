import { z } from 'zod';

export const applicationDeleteTraceWeightingOutputSchema = z.object({
  success: z.boolean(),
  id: z.number().int().positive(),
});

export type TApplicationDeleteTraceWeightingResponse = z.infer<
  typeof applicationDeleteTraceWeightingOutputSchema
>;

export const applicationTraceWeightingDetailItemSchema = z.object({
  weightingId: z.number().int(),
  batchId: z.number().int(),
  containerId: z.number().int(),
  productId: z.string(),
  productName: z.string().nullable(),
  lotName: z.string().nullable(),
  quantity: z.coerce.number(),
  authorName: z.string().nullable(),
  weightingDate: z.coerce.date(),
  containerRecordsCount: z.number().int(),
  loadingDate: z.coerce.date().nullable(),
});

// 2. Base row schema (used directly when getAllRows === true)
export const applicationTraceWeightingRowOutputSchema = z.object({
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

// 3. Paginated row schema (extends base row with weightings array)
export const applicationTraceWeightingPaginatedRowOutputSchema =
  applicationTraceWeightingRowOutputSchema.extend({
    weightings: z.array(applicationTraceWeightingDetailItemSchema),
  });

// 4. Separate Response Schemas
export const applicationTraceWeightingAllRowsReportOutputSchema = z.object({
  rows: z.array(applicationTraceWeightingRowOutputSchema).nullable(),
  total: z.number().int(),
  totalPages: z.number().int(),
});

export const applicationTraceWeightingPaginatedReportOutputSchema = z.object({
  rows: z.array(applicationTraceWeightingPaginatedRowOutputSchema).nullable(),
  total: z.number().int(),
  totalPages: z.number().int(),
});

// 5. Combined Output Schema (for tRPC / OpenAPI / REST router output validation)
export const applicationTraceWeightingListOutputSchema = z.union([
  applicationTraceWeightingPaginatedReportOutputSchema,
  applicationTraceWeightingAllRowsReportOutputSchema,
]);

export type TApplicationTraceWeightingDetailItem = z.infer<
  typeof applicationTraceWeightingDetailItemSchema
>;

export type TApplicationTraceWeightingListRowItem = z.infer<
  typeof applicationTraceWeightingRowOutputSchema
>;

export type TApplicationTraceWeightingListPaginatedRowItem = z.infer<
  typeof applicationTraceWeightingPaginatedRowOutputSchema
>;

export type TApplicationTraceWeightingListAllRowsResponse = z.infer<
  typeof applicationTraceWeightingAllRowsReportOutputSchema
>;

export type TApplicationTraceWeightingListPaginatedResponse = z.infer<
  typeof applicationTraceWeightingPaginatedReportOutputSchema
>;

export type TApplicationTraceWeightingListResponse = z.infer<
  typeof applicationTraceWeightingListOutputSchema
>;
