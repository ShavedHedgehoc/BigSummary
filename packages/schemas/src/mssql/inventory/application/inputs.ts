import { z } from 'zod';

export const applicationGetTraceInventoryListInputSchema = z.object({
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

export const applicationGetTraceInventoryDetailInputSchema = z.object({
  inventoryId: z.number(),
  productCode: z.string().nullable(),
  dayToExpireRest: z.array(z.string()).nullish(),
  applyFilter: z.boolean(),
});

export const applicationDeleteTraceInventoryInputSchema = z.object({
  id: z.number().int().positive(),
});

export type TApplicationGetTraceInventoryListInput = z.infer<
  typeof applicationGetTraceInventoryListInputSchema
>;

export type TApplicationGetTraceInventoryDetailInput = z.infer<
  typeof applicationGetTraceInventoryDetailInputSchema
>;

export type TApplicationDeleteTraceInventoryInput = z.infer<
  typeof applicationDeleteTraceInventoryInputSchema
>;
