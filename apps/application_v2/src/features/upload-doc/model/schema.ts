import * as z from 'zod';
import { JSONSchemaType } from 'ajv';
import { TApplicationUploadDocRecordRowInput } from '@repo/schemas';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
export const ACCEPTED_FILE_TYPES = [
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-excel',
];

export const uploadDocFormSchema = z.object({
  date: z.date('Необходимо выбрать дату'),
  plantId: z.string(),
  update: z.boolean(),
  file: z
    .instanceof(File, { message: 'Необходимо выбрать файл' })
    .refine((file) => {
      return file.size <= MAX_UPLOAD_SIZE;
    }, `Max file size is 3MB.`)
    .refine((file) => {
      return ACCEPTED_FILE_TYPES.includes(file.type);
    }, 'Only .xls and .xlsx formats are accepted.'),
});

export type UploadDocFormValues = z.infer<typeof uploadDocFormSchema>;

export const summaryValidationSchema: JSONSchemaType<TApplicationUploadDocRecordRowInput> = {
  type: 'object',
  properties: {
    code1C: {
      type: 'string',
      pattern: '^[0-9]{6}$',
      errorMessage: { pattern: 'Код 1С должен быть шестизначным числом' },
    },
    product: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: 'Артикул должен содержать хотя бы один символ',
        maxLength: 'Длина артикула не должна быть больше 50 символов',
        type: '',
      },
    },
    serie: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: 'Наименование серии должно содержать хотя бы один символ',
        maxLength: 'Длина наименования серии не должно быть больше 50 символов',
        type: '',
      },
    },
    batch: {
      type: 'string',
      pattern: '(^[1-9]{1}[0-9]{1,3}[A-L]{1}\\d{1,2}[R,S,Z,X]{0,1}$|^-+$)',
      errorMessage: { pattern: 'Шаблон партии не совпадает (ожидается номер варки или "-")' },
    },
    apparatus: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: 'Аппарат должен содержать хотя бы один символ',
        maxLength: 'Длина аппарата не должна быть больше 50 символов',
        type: '',
      },
    },
    can: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: 'Наименование емкости должо содержать хотя бы один символ',
        maxLength: 'Длина наименования не должна быть больше 50 символов',
        type: '',
      },
    },
    conveyor: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: 'Наименование конвейера должно содержать хотя бы один символ',
        maxLength: 'Длина наименования конвейера не должна быть больше 50 символов',
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
    // check all patterns
    bbf: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    note: {
      type: 'string',
      minLength: 1,
      maxLength: 1024,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    workshop: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    boil1: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    boil2: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    semi_product: {
      type: 'string',
      pattern:
        '^(\\{[0-9]{6}#[0-9]{1,4}[A-L][0-9]{1,2}[X-Z,S,R]{0,1}[S]{0,1}#[^\\}#]+\\})+\\s*$|^-$',
      errorMessage: {
        pattern:
          'Поле должно содержать полупродукты в формате {код#варка#наименование} или знак "-"',
      },
    },
    org_base_min_weight: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    org_base_max_weight: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    water_base_min_weight: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    water_base_max_weight: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    per_box: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    box_per_row: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    row_on_pallet: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    gasket: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    seal: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    technician_note: {
      type: 'string',
      minLength: 1,
      maxLength: 255,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    packaging_note: {
      type: 'string',
      minLength: 1,
      maxLength: 300,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    marking_sample: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    marking_feature: {
      type: 'string',
      minLength: 1,
      maxLength: 400,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    ink_color: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
    dm: {
      type: 'string',
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: '',
        maxLength: '',
        type: '',
      },
    },
  },
  required: [
    'code1C',
    'product',
    'serie',
    'batch',
    'apparatus',
    'can',
    'conveyor',
    'plan',
    'bbf',
    'note',
    'workshop',
    'boil1',
    'boil2',
    'semi_product',
    'org_base_min_weight',
    'org_base_max_weight',
    'water_base_min_weight',
    'water_base_max_weight',
    'per_box',
    'box_per_row',
    'row_on_pallet',
    'gasket',
    'seal',
    'technician_note',
    'packaging_note',
    'marking_sample',
    'marking_feature',
    'ink_color',
    'dm',
  ],
  errorMessage: {
    required: {
      code1C: 'Отсутствует необходимое поле "code1C"',
      product: 'Отсутствует необходимое поле "product"',
      serie: 'Отсутствует необходимое поле "serie"',
      batch: 'Отсутствует необходимое поле "batch"',
      apparatus: 'Отсутствует необходимое поле "apparatus"',
      can: 'Отсутствует необходимое поле "can"',
      conveyor: 'Отсутствует необходимое поле "conveyor"',
      plan: 'Отсутствует необходимое поле "plan"',
      bbf: 'Отсутствует необходимое поле "bbf"',
      note: 'Отсутствует необходимое поле "note"',
      workshop: 'Отсутствует необходимое поле "workshop"',
      boil1: 'Отсутствует необходимое поле "boil1"',
      boil2: 'Отсутствует необходимое поле "boil2"',
      semi_product: 'Отсутствует необходимое поле "semi_product"',
      org_base_min_weight: 'Отсутствует необходимое поле "org_base_min_weight"',
      org_base_max_weight: 'Отсутствует необходимое поле "org_base_max_weight"',
      water_base_min_weight: 'Отсутствует необходимое поле "water_base_min_weight"',
      water_base_max_weight: 'Отсутствует необходимое поле "water_base_max_weight"',
      per_box: 'Отсутствует необходимое поле "per_box"',
      box_per_row: 'Отсутствует необходимое поле "box_per_row"',
      row_on_pallet: 'Отсутствует необходимое поле "row_on_pallet"',
      gasket: 'Отсутствует необходимое поле "gasket"',
      seal: 'Отсутствует необходимое поле "seal"',
      technician_note: 'Отсутствует необходимое поле "technician_note"',
      packaging_note: 'Отсутствует необходимое поле "packaging_note"',
      marking_sample: 'Отсутствует необходимое поле "marking_sample"',
      marking_feature: 'Отсутствует необходимое поле "marking_feature"',
      ink_color: 'Отсутствует необходимое поле "ink_color"',
      dm: 'Отсутствует необходимое поле "dm',
    },
  },
};
