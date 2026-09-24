import * as z from 'zod';
export const editDocRowFormSchema = z.object({
  apparatus: z.string(),
  can: z.string(),
  conveyor: z.string(),
  plan: z.int(),
  note: z.string(),
});

export type EditDocRowFormValues = z.infer<typeof editDocRowFormSchema>;
