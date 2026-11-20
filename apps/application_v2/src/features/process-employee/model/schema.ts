import * as z from 'zod';

export const employeeFormSchema = z.object({
  name: z.string().trim().min(1, 'Введите имя сотрудника'),
  barcode: z.string().trim().min(1, 'Введите штрихкод'),
  occupationId: z
    .number({ message: 'Выберите должность' })
    .int()
    .nullable()
    .refine((val) => val !== null && val > 0, {
      message: 'Выберите должность',
    }),
});

export type EmployeeFormValues = z.infer<typeof employeeFormSchema>;
