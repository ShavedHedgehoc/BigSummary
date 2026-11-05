import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { TApplicationConveyorItem, TApplicationUpdateConveyorInput } from '@repo/schemas';
import { useEffect } from 'react';
import { useUpdateConveyor } from './use-update-conveyor';
import { editConveyorFormSchema, EditConveyorFormValues } from '../lib/schema';
import { useConveyorListUiParams } from '@/entities/conveyor';

interface IUseEditConveyorFormProps {
  row?: TApplicationConveyorItem;
}

export const useEditConveyorForm = ({ row }: IUseEditConveyorFormProps = {}) => {
  const { updateConveyorAsync } = useUpdateConveyor();
  const { setParams: setUiParams } = useConveyorListUiParams();
  const form = useForm<EditConveyorFormValues>({
    resolver: zodResolver(editConveyorFormSchema),
    defaultValues: {
      barcode: undefined,
    },
  });
  const {
    control,
    reset,
    formState: { isSubmitting, isDirty },
  } = form;

  useEffect(() => {
    if (row) {
      reset({
        barcode: row.barcode ?? undefined,
      });
    } else {
      reset({
        barcode: undefined,
      });
    }
  }, [row, reset]);

  const barcodeValue = useWatch({ control, name: 'barcode' });
  const submitDisable = isSubmitting || !isDirty || !barcodeValue;
  const resetDisable = !isDirty || isSubmitting;

  async function onSubmit(data: EditConveyorFormValues) {
    if (!row) return;
    const dto: TApplicationUpdateConveyorInput = {
      id: row.id,
      value: row.value,
      barcode: data.barcode,
    };

    try {
      await updateConveyorAsync(dto);
      reset(data);
      setUiParams({ selectedConveyorId: null });
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    }
  }

  return {
    form,
    onSubmit,
    submitDisable,
    resetDisable,
    isSubmitting,
  };
};
