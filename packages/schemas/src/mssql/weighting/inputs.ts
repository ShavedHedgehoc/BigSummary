import { z } from 'zod';

export const applicationDeleteTraceWeightingInputSchema = z.object({
  id: z.number().int().positive(),
});

export type TApplicationDeleteTraceWeightingInput = z.infer<
  typeof applicationDeleteTraceWeightingInputSchema
>;

export const applicationTraceWeightingListInputSchema = z.object({
  batchName: z.string().default(''),
  productId: z.string().default(''),
  compare: z.boolean().default(true),
  sortByBatch: z.boolean().default(false),
  startDate: z.coerce.date().default(() => new Date()),
  endDate: z.coerce.date().default(() => new Date()),
  plants: z.array(z.string()).nullish(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  getAllRows: z.boolean().default(false),
});

// // Base inferred type (getAllRows: boolean)
export type TApplicationTraceWeightingListInput = z.infer<
  typeof applicationTraceWeightingListInputSchema
>;

// // Narrowed input types for TypeScript overloads
export type TApplicationTraceWeightingListAllRowsInput = Omit<
  TApplicationTraceWeightingListInput,
  'getAllRows'
> & {
  getAllRows: true;
};

export type TApplicationTraceWeightingListPaginatedInput = Omit<
  TApplicationTraceWeightingListInput,
  'getAllRows'
> & {
  getAllRows: false;
};
