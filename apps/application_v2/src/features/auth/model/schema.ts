import * as z from 'zod';
import { authSchema } from '@repo/schemas';

export const loginFormSchema = authSchema
  .extend({
    isRegister: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.isRegister && (!data.name || data.name.trim() === '')) {
        return false;
      }
      return true;
    },
    {
      message: 'Имя обязательно для регистрации',
      path: ['name'],
    },
  )
  .refine(
    (data) => {
      if (data.isRegister && (!data.password || data.password.trim() === '')) {
        return false;
      }
      return true;
    },
    {
      message: 'Пароль обязателен для регистрации',
      path: ['password'],
    },
  );

export type LoginFormValues = z.infer<typeof loginFormSchema>;
