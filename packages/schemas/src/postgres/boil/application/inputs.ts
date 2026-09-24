import { z } from 'zod';

export const getApplicationLabBoilListInput = z.object({
  baseCode: z.string().default(''),
  boil: z.string().default(''),
  marking: z.string().default(''),
  // haveRecord: z.boolean().default(true),
  boilAsc: z.boolean().default(true),
  states: z.array(z.string()).nullish(),
  plants: z.array(z.string()).nullish(),
  limit: z.number().int().positive().default(10),
  page: z.number().int().nonnegative().default(1),
});

export type TGetApplicationLabBoilListInput = z.infer<typeof getApplicationLabBoilListInput>;
