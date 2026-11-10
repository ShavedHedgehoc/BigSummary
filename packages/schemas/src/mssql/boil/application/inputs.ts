import { z } from 'zod';

export const applicationGetTraceBoilWghtReportInputSchema = z.object({
  batchName: z.string().default(''),
  productId: z.string().default(''),
  compare: z.boolean().default(true),
  sortByBatch: z.boolean().default(false),

  startDate: z.coerce.date().default(() => {
    const now = new Date();
    return now;
  }),
  endDate: z.coerce.date().default(() => {
    const now = new Date();
    return now;
  }),
  plants: z.array(z.string()).nullish(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  getAllRows: z.boolean().default(false),
});

export type TGetApplicationGetTraceBoilWghtReportInput = z.infer<
  typeof applicationGetTraceBoilWghtReportInputSchema
>;
