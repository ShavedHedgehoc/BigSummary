import { z } from 'zod';

export const applicationConveyorOutputSchema = z.object({
  id: z.number().int(),
  value: z.string(),
  barcode: z.string().nullable(),
  haveRecord: z.boolean(),
});

export const applicationConveyorListOutputSchema = z.object({
  rows: z.array(applicationConveyorOutputSchema),
  total: z.number().int(),
  totalPages: z.number().int(),
});

export const applicationUpdateConveyorOutputSchema = z.object({
  id: z.number().int().positive(),
  success: z.boolean(),
});

export const applicationDeleteConveyorOutputSchema = z.object({
  id: z.number().int().positive(),
  success: z.boolean(),
});

export type TApplicationConveyorItem = z.infer<typeof applicationConveyorOutputSchema>;
export type TApplicationConveyorListResponse = z.infer<typeof applicationConveyorListOutputSchema>;
export type TApplicationDeleteConveyorResponse = z.infer<
  typeof applicationDeleteConveyorOutputSchema
>;
export type TApplicationUpdateConveyorResponse = z.infer<
  typeof applicationUpdateConveyorOutputSchema
>;
