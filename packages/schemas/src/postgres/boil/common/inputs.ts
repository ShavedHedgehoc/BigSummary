import { z } from 'zod';

export const boilListFilterSchema = z.object({
  baseCode: z.string().default(''),
  boil: z.string().default(''),
  marking: z.string().default(''),
  haveRecord: z.boolean().default(true),
  boilAsc: z.boolean().default(true),
  states: z.array(z.number()).default([]),
  plants: z.array(z.number()).default([]),
});

export const getBoilListInputSchema = z.object({
  filter: boilListFilterSchema,
  limit: z.number().int().positive().default(10),
  page: z.number().int().nonnegative().default(1),
});

export type IBoilListFilter = z.infer<typeof boilListFilterSchema>;
export type TGetBoilListInput = z.infer<typeof getBoilListInputSchema>;
