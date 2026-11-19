import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldError, FieldLabel, FileInputWithIcon } from '@/shared/ui';
import React from 'react';
import { UpdateBaseFormValues } from '../model/schema';

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
  const { control } = useFormContext<UpdateBaseFormValues>();
  return (
    <Controller
      name="file"
      control={control}
      render={({ field: { onChange, onBlur, name, ref }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="update-bases-form-file">Файл основ</FieldLabel>
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
            id="update-bases-form-file"
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
