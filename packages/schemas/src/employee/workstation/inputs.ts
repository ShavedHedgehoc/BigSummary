import { z } from 'zod';

export const getEmployeeByBarcodeSchema = z.object({
    barcode: z.string().default(''),
});



export type TGetEmployeeByBarcode = z.infer<typeof getEmployeeByBarcodeSchema>;
