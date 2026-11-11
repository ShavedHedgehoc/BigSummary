import * as z from 'zod';
import { JSONSchemaType } from 'ajv';
import { TApplicationUploadTraceBoilRowInput } from '@repo/schemas';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
export const ACCEPTED_FILE_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
  'application/vnd.ms-excel.sheet.macroEnabled.12',
];

export const uploadBoilFormSchema = z.object({
  file: z
    .instanceof(File, { message: 'Необходимо выбрать файл' })
    .refine((file) => {
      return file.size <= MAX_UPLOAD_SIZE;
    }, 'Максимальный размер файла — 3МБ.')
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, 'Допускаются только форматы .xls, .xlsx и .xlsm.'),
});

export type UploadBoilFormValues = z.infer<typeof uploadBoilFormSchema>;

export const boilValidationSchema: JSONSchemaType<TApplicationUploadTraceBoilRowInput> = {
  type: 'object',
  properties: {
    date: {
      type: 'string',
      // pattern: '^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$',
      pattern: '^(0[1-9]|[12][0-9]|3[01])\\.(0[1-9]|1[0-2])\\.\\d{4}$',
      errorMessage: { pattern: 'Дата должна быть в формате даты' },
    },
    fin_productid: {
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
    batch: {
      type: 'string',
      // pattern: '(^[1-9]{1}[0-9]{1,3}[A-L]{1}\\d{1,2}[R,S,Z,X]{0,1}$|^-+$)',
      pattern: '(^[1-9][0-9]{0,3}[A-L]\\d{1,2}[RSZX]?$|^-+$)',
      errorMessage: { pattern: 'Шаблон партии не совпадает (ожидается номер варки или "-")' },
    },
    apparatus: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: 'Аппарат должен содержать хотя бы один символ',
        maxLength: 'Длина поля аппарата не должна быть больше 50 символов',
        type: '',
      },
    },
    plan: {
      type: 'string',
      pattern: '^(?:[1-9]\\d{0,5})$',
      errorMessage: {
        pattern: 'План должен быть целым числом от 1 до 999 999',
      },
    },
    productid: {
      type: 'string',
      pattern: '^[0-9]{6}$',
      errorMessage: { pattern: 'Код 1С должен быть шестизначным числом' },
    },
    productname: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
      errorMessage: {
        minLength: 'Длина поля наименования не должна быть пустой',
        maxLength: 'Длина поля наименования не должна быть больше 255 символов',
        type: 'Поле наименования должно быть строкой',
      },
    },
    quantity: {
      type: 'string',
      // pattern: '^(?:[1-9]\d*|0)(?:\.\d{1,5})?$',
      pattern: '^(?:[1-9]\\d*|0)(?:[\\.,]\\d{1,5})?$',
      errorMessage: {
        pattern: 'Допустимы значения от "0,00001" до "999 999,00001"',
      },
    },
    plant: {
      type: 'string',
      // pattern: '^(?:[П,К]\\d{1})$',
      pattern: '^[ПК]$',
      errorMessage: {
        pattern: 'Допустимы значения "П" или "К"',
      },
    },
  },
  required: [
    'date',
    'fin_productid',
    'marking',
    'batch',
    'apparatus',
    'plan',
    'productid',
    'productname',
    'quantity',
    'plant',
  ],
  errorMessage: {
    required: {
      date: 'Отсутствует необходимое поле date',
      fin_productid: 'Отсутствует необходимое поле fin_productid',
      marking: 'Отсутствует необходимое поле marking',
      batch: 'Отсутствует необходимое поле batch',
      apparatus: 'Отсутствует необходимое поле apparatus',
      plan: 'Отсутствует необходимое поле plan',
      productid: 'Отсутствует необходимое поле productid',
      productname: 'Отсутствует необходимое поле productname',
      quantity: 'Отсутствует необходимое поле quantity',
      plant: 'Отсутствует необходимое поле plant',
    },
  },
};
