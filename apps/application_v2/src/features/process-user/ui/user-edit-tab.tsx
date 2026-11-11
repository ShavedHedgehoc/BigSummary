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
import { TApplicationUserItem } from '@repo/schemas';
import { useUserEditTab } from '../model/hooks/use-user-edit-tab';
import React from 'react';

interface IUserEditTabProps {
  row?: TApplicationUserItem;
}

export function UserEditTab({ row }: IUserEditTabProps) {
  const { form, onSubmit, plantListItems, submitDisable, isSubmitting, isDirty, handleReset } =
    useUserEditTab({
      row,
    });
  if (!row) return null;

  return (
    <FormProvider {...form}>
      <form
        id="update-user-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col flex-1 justify-between min-h-0"
      >
        <div className="space-y-4 py-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="update-user-form-name">ФИО</FieldLabel>
                <Input {...field} id="update-user-form-name" className="w-full text-xs" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="update-user-form-email">Email</FieldLabel>
                <Input {...field} id="update-user-form-email" className="w-full text-xs" />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name="user_settings.plant_id"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="upload-doc-form-plant">Площадка</FieldLabel>
                <Select
                  value={field.value ? String(field.value) : 'All'}
                  onValueChange={(val) => {
                    // Конвертируем строку обратно в число/null для Zod
                    const numericValue = val === 'All' ? null : Number(val);
                    field.onChange(numericValue);
                  }}
                >
                  <SelectTrigger id="upload-doc-form-plant" className="w-full text-xs h-8">
                    <SelectValue placeholder="Выберите площадку" />
                  </SelectTrigger>
                  <SelectContent>
                    {(plantListItems ?? []).map((item) => (
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

          <Button type="submit" size="sm" disabled={submitDisable || isSubmitting || !isDirty}>
            {isSubmitting ? 'Сохранение...' : 'Сохранить профиль'}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
