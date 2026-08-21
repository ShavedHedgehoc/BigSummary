import { z } from 'zod';

export const traceCanStateOutputSchema = z.object({
    CanStatePK: z.number().int(),
    CanStateName: z.string(),
    CanStateDescription: z.string(),
    isBaseState: z.boolean().nullable(),
    CanStateOrderValue: z.number().int().nullable(),
});

export const traceCanStateListOutputSchema = z.array(traceCanStateOutputSchema)

export type ITraceCanState = z.infer<typeof traceCanStateOutputSchema>;
export type TTraceCanStateListResponse = z.infer<typeof traceCanStateListOutputSchema>;

