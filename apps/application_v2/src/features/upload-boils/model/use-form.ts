import { ACCEPTED_FILE_TYPES, UploadBoilFormValues, uploadBoilFormSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { useXlsxParser } from '../lib/use-xlsx-parser';
import { useRef } from 'react';

import { TApplicationUploadTraceBoilInput, TBatchRecord } from '@repo/schemas';
import { useUploadTraceBoilData } from './use-upload-trace-boil-data';
import { toast } from 'sonner';
import { useBoilsUploadUploadComponentStore } from './store';
import { useShallow } from 'zustand/react/shallow';

export const useTraceBoilUploadForm = () => {
  const {
    isProcessed,
    setIsProcessed,
    setToProcess,
    increaseSuccess,
    increaseProcessed,
    increaseFail,
  } = useBoilsUploadUploadComponentStore(
    useShallow((state) => ({
      isProcessed: state.isProcessed,
      setIsProcessed: state.setIsProcessed,
      toProcess: state.toProcess,
      setToProcess: state.setToProcess,
      increaseSuccess: state.increaseSuccess,
      increaseProcessed: state.increaseProcessed,
      increaseFail: state.increaseFail,
      processed: state.processed,
      fail: state.fail,
    })),
  );
  const {
    validate,
    errors,
    reset: resetXlsx,
    isValid,
    isPending,
    data: fileData,
  } = useXlsxParser();
  const { uploadTRaceBoilDataAsync: uploadAsync, isPending: uploadPending } =
    useUploadTraceBoilData();
  const form = useForm<UploadBoilFormValues>({
    resolver: zodResolver(uploadBoilFormSchema),
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
    const total = fileData.length;
    if (total === 0) return;
    setToProcess(total);
    setIsProcessed(true);
    async function processDocument(documentItem: TBatchRecord) {
      const xmlDto: TApplicationUploadTraceBoilInput = {
        document: {
          batch_record: documentItem,
        },
      };

      try {
        const result = await uploadAsync(xmlDto);

        if (result && result.value === 1) {
          increaseSuccess();
        } else {
          increaseFail();
        }
      } catch (error) {
        console.error('Критическая ошибка сети при отправке документа:', error);
        increaseFail();
      } finally {
        increaseProcessed();
        await new Promise((resolve) => setTimeout(resolve, 0));
      }
    }

    try {
      const queue = [...fileData];
      const CONCURRENCY_LIMIT = 3;
      async function worker() {
        while (queue.length > 0) {
          const documentItem = queue.shift();
          if (!documentItem) break;
          await processDocument(documentItem);
        }
      }
      const workers = [];
      for (let i = 0; i < Math.min(CONCURRENCY_LIMIT, queue.length); i++) {
        workers.push(worker());
      }
      await Promise.all(workers);
    } catch (globalError) {
      toast.success('Непредвиденная глобальная ошибка:');
      console.error('Непредвиденная глобальная ошибка:', globalError);
    } finally {
      setIsProcessed(false);
      toast.success('Данные загружены');
      form.reset();
      resetXlsx();
    }
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
    isProcessed,
  };
};
