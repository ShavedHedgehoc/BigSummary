import * as z from 'zod';
export const changeStateFormSchema = z.object({
  state: z.string(),
  note: z.string(),
});

export type ChangeStateFormValues = z.infer<typeof changeStateFormSchema>;
