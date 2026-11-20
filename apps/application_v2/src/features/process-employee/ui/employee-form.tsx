'use client';

import { FormProvider, Controller } from 'react-hook-form';
import {
  Button,
  Field,
  FieldError,
  FieldLabel,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';
import { TApplicationEmployeeItem } from '@repo/schemas';

import { TEmployeeFormMode, useEmployeeForm } from '../model/hooks/use-employee-form';

interface IEmployeeFormProps {
  mode: TEmployeeFormMode;
  row?: TApplicationEmployeeItem;
  onSuccess?: () => void;
}

const FORM_TEXTS: Record<
  TEmployeeFormMode,
  {
    title: string;
    submitButton: string;
    submittingButton: string;
  }
> = {
  create: {
    title: 'Новый сотрудник',
    submitButton: 'Создать',
    submittingButton: 'Создание...',
  },
  edit: {
    title: 'Редактирование сотрудника',
    submitButton: 'Сохранить',
    submittingButton: 'Сохранение...',
  },
};

export function EmployeeForm({ mode, row, onSuccess }: IEmployeeFormProps) {
  const { form, onSubmit, occupationListItems, submitDisable, isSubmitting, isDirty, handleReset } =
    useEmployeeForm({
      mode,
      row,
      onSuccess,
    });

  const { control, handleSubmit } = form;

  const texts = FORM_TEXTS[mode];
  return (
    <FormProvider {...form}>
      <form
        id="employee-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-1 justify-between min-h-0 px-4"
      >
        <div className="space-y-4 py-2">
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="employee-form">ФИО</FieldLabel>
                <Input {...field} id="employee-form-name" className="w-full text-xs" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="barcode"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="employee-form-barcode">Штрихкод</FieldLabel>
                <Input {...field} id="employee-form-barcode" className="w-full text-xs" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="occupationId"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="employee-form-occupationId">Роль</FieldLabel>
                <Select
                  value={field.value != null ? String(field.value) : 'All'}
                  onValueChange={(val) => {
                    const nextValue = !val || val === 'All' ? null : Number(val);
                    if (nextValue !== field.value) {
                      field.onChange(nextValue);
                    }
                  }}
                >
                  <SelectTrigger id="employee-form-occupationId" className="w-full text-xs h-8">
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent>
                    {(occupationListItems ?? []).map((item) => (
                      <SelectItem key={item.value} value={item.value} className="text-xs">
                        {item.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </div>

        <div className="flex items-center justify-end gap-2 border-t pt-4 bg-card">
          {isDirty && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={isSubmitting}
              onClick={handleReset}
            >
              Сбросить
            </Button>
          )}

          <Button
            type="submit"
            size="sm"
            disabled={submitDisable || isSubmitting || (mode === 'edit' && !isDirty)}
          >
            {isSubmitting ? texts.submittingButton : texts.submitButton}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
