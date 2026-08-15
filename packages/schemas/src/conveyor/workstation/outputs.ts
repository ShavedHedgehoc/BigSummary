import { z } from 'zod';


export const workstationConveyorByBarcodeOutputSchema = z.object({
    id: z.number().int(),
    value: z.string(),
    barcode: z.string().optional().nullable(),

});

export type TWorkstationConveyorByBarcodeOutput = z.infer<typeof workstationConveyorByBarcodeOutputSchema>;