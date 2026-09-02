import { z } from 'zod';

export const dashTraceCanDataListFilterSchema = z.object({
  can: z.string().default(''),
  volumes: z.array(z.number()).default([]),
  states: z.array(z.number()).default([]),
  plants: z.array(z.number()).default([]),
  transit: z.boolean().default(false),
});

export const dashTraceCanDataListInputSchema = z.object({
  filter: dashTraceCanDataListFilterSchema,
});

export type IDashTraceCanDataListFilter = z.infer<typeof dashTraceCanDataListFilterSchema>;
export type TGetDashTraceCanDataListInput = z.infer<typeof dashTraceCanDataListInputSchema>;
