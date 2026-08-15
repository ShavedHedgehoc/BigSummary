import { z } from 'zod';
const occupationSchema = z.object({
    id: z.number().int(),
    value: z.string(),
    description: z.string(),
});

export const workstationEmployeeByBarcodeOutputSchema = z.object({
    id: z.number().int(),
    name: z.string(),
    barcode: z.string(),
    occupationId: z.number().int(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    occupations: occupationSchema.nullable().optional(),
});

export type TWorkstationEmployeeByBarcodeOutput = z.infer<typeof workstationEmployeeByBarcodeOutputSchema>;