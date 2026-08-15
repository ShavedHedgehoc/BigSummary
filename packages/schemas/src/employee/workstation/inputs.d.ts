import { z } from 'zod';
export declare const getEmployeeByBarcodeSchema: z.ZodObject<{
    barcode: z.ZodDefault<z.ZodString>;
}, z.core.$strip>;
export type TGetEmployeeByBarcode = z.infer<typeof getEmployeeByBarcodeSchema>;
