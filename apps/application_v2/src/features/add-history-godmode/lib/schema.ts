import * as z from 'zod';
export const addHistoryFormSchema = z.object({
  state: z.string(),
  note: z.string().optional().or(z.literal('')),
});

export type AddHistoryFormValues = z.infer<typeof addHistoryFormSchema>;
