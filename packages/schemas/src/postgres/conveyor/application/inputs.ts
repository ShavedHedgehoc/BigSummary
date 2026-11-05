import { z } from 'zod';

export const getApplicationConveyorListInputSchema = z.object({
  value: z.string().default(''),
  barcodes: z.array(z.string()).nullish(),
  records: z.array(z.string()).nullish(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export const applicationDeleteConveyorInputSchema = z.object({
  id: z.number().int().positive(),
});

export const applicationUpdateConveyorInputSchema = z.object({
  id: z.number().int().positive(),
  value: z.string(),
  barcode: z.string().optional(),
});

export type TGetApplicationConveyorListInput = z.infer<
  typeof getApplicationConveyorListInputSchema
>;
export type TApplicationDeleteConveyorInput = z.infer<typeof applicationDeleteConveyorInputSchema>;
export type TApplicationUpdateConveyorInput = z.infer<typeof applicationUpdateConveyorInputSchema>;
