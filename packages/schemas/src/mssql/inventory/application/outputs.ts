import { z } from 'zod';

export const applicationTraceInventoryOutputSchema = z.object({
  id: z.number().int().positive(),
  date: z.coerce.date(),
  isFinished: z.boolean(),
  plant: z.string(),
  recordsCount: z.number(),
});

export const applicationTraceInventoryListOutputSchema = z.object({
  rows: z.array(applicationTraceInventoryOutputSchema).nullable(),
  total: z.number().int(),
  totalPages: z.number().int(),
});

export const applicationTraceInventoryDetailHeaderSchema = z.object({
  id: z.number().int().positive(),
  plantId: z.number().int().positive(),
  date: z.coerce.date(),
  plant: z.string().nullable(),
});

export const applicationTraceInventoryDetailRowSchema = z.object({
  id: z.number().int().positive(),
  productId: z.string(),
  productName: z.string().nullable(),
  lotId: z.number().int().positive(),
  lotName: z.string(),
  quantity: z.number(),
  expDate: z.coerce.date(),
  authorName: z.string(),
  daysToExp: z.number(),
  isLessThenExpRest: z.boolean(),
});

export const applicationTraceInventoryDetailOutputSchema = z.object({
  header: applicationTraceInventoryDetailHeaderSchema.nullable(),
  rows: z.array(applicationTraceInventoryDetailRowSchema).nullable(),
});

export const applicationDeleteTraceInventoryOutputSchema = z.object({
  success: z.boolean(),
  id: z.number().int().positive(),
});

export type TApplicationTraceInventoryItem = z.infer<typeof applicationTraceInventoryOutputSchema>;

export type TApplicationTraceInventoryListResponse = z.infer<
  typeof applicationTraceInventoryListOutputSchema
>;

export type TApplicationTraceInventoryDetailHeader = z.infer<
  typeof applicationTraceInventoryDetailHeaderSchema
>;

export type TApplicationTraceInventoryDetailRowItem = z.infer<
  typeof applicationTraceInventoryDetailRowSchema
>;

export type TApplicationTraceInventoryDetailResponse = z.infer<
  typeof applicationTraceInventoryDetailOutputSchema
>;

export type TApplicationDeleteTraceInventoryResponse = z.infer<
  typeof applicationDeleteTraceInventoryOutputSchema
>;
