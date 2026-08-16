import { z } from 'zod';

export const getWorkstationConveyorByBarcodeSchema = z.object({
  barcode: z.string().default(''),
});

export type TGetWorkstationConveyorByBarcodeInput = z.infer<
  typeof getWorkstationConveyorByBarcodeSchema
>;
