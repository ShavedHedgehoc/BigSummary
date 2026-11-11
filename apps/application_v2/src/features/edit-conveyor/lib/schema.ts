import * as z from 'zod';
export const editConveyorFormSchema = z.object({
  barcode: z
    .string()
    .trim()
    .length(13, 'Штрихкод должен содержать 13 символов')
    .regex(/^\d+$/, 'Штрихкод должен состоять только из цифр'),
});

export type EditConveyorFormValues = z.infer<typeof editConveyorFormSchema>;
