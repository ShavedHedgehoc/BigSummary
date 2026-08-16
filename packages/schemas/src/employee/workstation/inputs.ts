import { z } from 'zod';

export const getWorkstationEmployeeByBarcodeSchema = z.object({
  barcode: z.string().default(''),
});

export type TGetWorkstationEmployeeByBarcodeInput = z.infer<
  typeof getWorkstationEmployeeByBarcodeSchema
>;
