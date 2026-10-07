import { z } from 'zod';

export const regulationSchema = z.object({
  org_base_min_weight: z.string().nullable(),
  org_base_max_weight: z.string().nullable(),
  water_base_min_weight: z.string().nullable(),
  water_base_max_weight: z.string().nullable(),
  per_box: z.number().int().nullable(),
  box_per_row: z.number().int().nullable(),
  row_on_pallet: z.number().int().nullable(),
  gasket: z.string().nullable(),
  seal: z.boolean().nullable(),
  technician_note: z.string().nullable(),
  packaging_note: z.string().nullable(),
  inc_color: z.string().nullable(),
  marking_feature: z.string().nullable(),
  marking_sample_value: z.string().nullable(),
});

export type TRegulation = z.infer<typeof regulationSchema>;
