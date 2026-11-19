import * as z from 'zod';
import { JSONSchemaType } from 'ajv';
import { TApplicationUpdateBaseRowInput } from '@repo/schemas';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
export const ACCEPTED_FILE_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'application/vnd.ms-excel.sheet.macroEnabled.12',
];

export const updateBasesFormSchema = z.object({
  file: z
    .instanceof(File, { message: 'Необходимо выбрать файл' })
    .refine((file) => {
      return file.size <= MAX_UPLOAD_SIZE;
    }, 'Максимальный размер файла — 3МБ.')
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, 'Допускаются только форматы .xls, .xlsx и .xlsm.'),
});

export type UpdateBaseFormValues = z.infer<typeof updateBasesFormSchema>;

export const baseValidationSchema: JSONSchemaType<TApplicationUpdateBaseRowInput> = {
  type: 'object',
  properties: {
    code: {
      type: 'string',
      pattern: '^[0-9]{6}$',
      errorMessage: { pattern: 'Код 1С должен быть шестизначным числом' },
    },

    marking: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: 'Артикул должен содержать хотя бы один символ',
        maxLength: 'Длина артикула не должна быть больше 50 символов',
        type: '',
      },
    },
  },
  required: ['code', 'marking'],
  errorMessage: {
    required: {
      code: 'Отсутствует необходимое поле code',
      marking: 'Отсутствует необходимое поле marking',
    },
  },
};
