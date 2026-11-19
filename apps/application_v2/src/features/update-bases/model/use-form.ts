import { ACCEPTED_FILE_TYPES, updateBasesFormSchema, UpdateBaseFormValues } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useRef } from 'react';
import { useUpdateBases } from './use-update-bases';
import { TApplicationUpdateBaseInput } from '@repo/schemas';
import { useXlsxParser } from '../lib/use-xlsx-parser';

export const useUpdateBasesForm = () => {
  const {
    validate,
    errors,
    reset: resetXlsx,
    isValid,
    isPending,
    data: fileData,
  } = useXlsxParser();

  const { updateBases: upload, isPending: uploadPending } = useUpdateBases();

  const form = useForm<UpdateBaseFormValues>({
    resolver: zodResolver(updateBasesFormSchema),
    defaultValues: {
      file: undefined,
    },
  });
  const {
    control,
    formState: { isSubmitting },
  } = form;
  const fileValue = useWatch({ control, name: 'file' });

  const resetDisable = !fileValue;
  const submitDisable = !fileValue || !isValid || uploadPending || isSubmitting;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const acceptedFiles = ACCEPTED_FILE_TYPES.join(',');

  async function onSubmit() {
    if (fileData.length === 0) return;

    const dto: TApplicationUpdateBaseInput = {
      rows: fileData,
    };
    upload(dto);
    form.reset();
    resetXlsx();
  }

  const handleClose = () => {
    form.reset();
  };

  return {
    form,
    uploadPending,
    handleClose,
    onSubmit,
    validate,
    resetXlsx,
    errors,
    isPending,
    resetDisable,
    submitDisable,
    isValid,
    acceptedFiles,
    fileInputRef,
    fileValue,
  };
};
