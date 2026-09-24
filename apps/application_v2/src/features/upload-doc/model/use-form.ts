import {
  ACCEPTED_FILE_TYPES,
  uploadDocFormSchema,
  UploadDocFormValues,
  useDocListUiParams,
} from '@/entities/doc';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useXlsxParser } from '../lib/use-xlsx-parser';
import { useRef } from 'react';
import { useUploadDocData } from './use-upload-doc-data';
import { TApplicationUploadDocInput } from '@repo/schemas';

export const useDocUploadForm = () => {
  const { setParams } = useDocListUiParams();

  const {
    validate,
    errors,
    reset: resetXlsx,
    isValid,
    isPending,
    data: fileData,
  } = useXlsxParser();
  const { uploadDocData: upload, isPending: uploadPending } = useUploadDocData();
  const form = useForm<UploadDocFormValues>({
    resolver: zodResolver(uploadDocFormSchema),
    defaultValues: {
      file: undefined,
      plantId: undefined,
      date: undefined,
      update: false,
    },
  });
  const {
    control,
    formState: { isSubmitting },
  } = form;
  const fileValue = useWatch({ control, name: 'file' });
  const dateValue = useWatch({ control, name: 'date' });
  const plantValue = useWatch({ control, name: 'plantId' });
  const resetDisable = !fileValue && !dateValue;
  const submitDisable =
    !fileValue || !dateValue || !plantValue || !isValid || uploadPending || isSubmitting;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const acceptedFiles = ACCEPTED_FILE_TYPES.join(',');

  async function onSubmit(data: UploadDocFormValues) {
    if (fileData.length === 0) return;

    const dto: TApplicationUploadDocInput = {
      summaryDate: data.date,
      plantId: Number(data.plantId),
      update: data.update,
      // update: false,
      rows: fileData,
    };
    upload(dto);
    form.reset();
    resetXlsx();
    // setParams({ "upload-summary": false });
  }

  const handleClose = () => {
    form.reset();
    // setParams({ "upload-summary": false });
  };

  const handleErrorView = () => {
    setParams({ 'view-errors': true });
  };

  return {
    form,
    uploadPending,
    handleClose,
    handleErrorView,
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
