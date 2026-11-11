import { Controller, useFormContext } from 'react-hook-form';
import { Field, FieldError, FieldLabel, FileInputWithIcon } from '@/shared/ui';
import React from 'react';
import { UploadBoilFormValues } from '../model/schema';

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
  const { control } = useFormContext<UploadBoilFormValues>();
  return (
    <Controller
      name="file"
      control={control}
      render={({ field: { onChange, onBlur, name, ref }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="upload-trace-boil-form-file">Файл варок</FieldLabel>
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
