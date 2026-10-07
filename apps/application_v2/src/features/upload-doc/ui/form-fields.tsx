import { Controller, useFormContext } from 'react-hook-form';
import {
  DatePicker,
  Field,
  FieldError,
  FieldLabel,
  FileInputWithIcon,
  ISelectorWithIconListItem,
  Label,
  SelectorWithIcon,
  Switch,
} from '@/shared/ui';
import React from 'react';
import { Factory } from 'lucide-react';
import { UploadDocFormValues } from '../model/schema';

export function DateField() {
  const { control } = useFormContext<UploadDocFormValues>();
  return (
    <Controller
      name="date"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="upload-doc-form-date">Дата сводки</FieldLabel>
          <DatePicker {...field} id="upload-doc-form-date" className="w-full text-xs" />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

interface TDPlantFieldProps {
  items: ISelectorWithIconListItem[];
}

export function PlantField({ items = [] }: TDPlantFieldProps) {
  const { control } = useFormContext<UploadDocFormValues>();
  return (
    <Controller
      name="plantId"
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="upload-doc-form-plant">Площадка</FieldLabel>
          <SelectorWithIcon
            {...field}
            id="upload-doc-form-plant"
            className="w-full text-xs"
            itemClassName="text-xs"
            icon={<Factory />}
            items={items}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function UploadModeField() {
  const { control } = useFormContext<UploadDocFormValues>();
  return (
    <Controller
      name="update"
      control={control}
      render={({ field: { value, onChange, onBlur, name }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="upload-doc-form-update">Режим загрузки</FieldLabel>
          <div className="flex items-center space-x-2">
            <Switch
              id="upload-doc-form-update"
              name={name}
              onBlur={onBlur}
              checked={value}
              onCheckedChange={onChange}
            />
            <Label htmlFor="upload-doc-form-update">{value ? 'Обновление' : 'Загрузка'}</Label>
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function FileField({
  fileInputRef,
  acceptedFiles,
  validate,
  reset,
}: {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  acceptedFiles: string;
  validate: (file: File) => void;
  reset: () => void;
}) {
  const { control } = useFormContext<UploadDocFormValues>();
  return (
    <Controller
      name="file"
      control={control}
      render={({ field: { onChange, onBlur, name, ref }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="upload-doc-form-file">Файл сводки</FieldLabel>
          <FileInputWithIcon
            className="text-xs"
            name={name}
            onBlur={onBlur}
            ref={(instance) => {
              ref(instance);
              if (fileInputRef) {
                (fileInputRef as React.RefObject<HTMLInputElement | null>).current = instance;
              }
            }}
            id="upload-doc-form-file"
            accept={acceptedFiles}
            onChange={(e) => {
              const file = e.target.files?.[0];
              onChange(file);
              if (file) {
                validate(file);
              } else {
                reset();
              }
            }}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
