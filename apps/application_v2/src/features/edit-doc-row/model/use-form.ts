import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { editDocRowFormSchema, EditDocRowFormValues } from '../lib';
import { TApplicationDocDetailRowItem, TApplicationUpdateDocRowInput } from '@repo/schemas';
import { useEffect } from 'react';
import { useUpdateDocRow } from './use-update-doc-row';

interface UseEditDocRowFormProps {
  row?: TApplicationDocDetailRowItem;
}

export const useEditDocRowForm = ({ row }: UseEditDocRowFormProps = {}) => {
  const { updateDocRowAsync: updateDocRowAsync } = useUpdateDocRow();
  const form = useForm<EditDocRowFormValues>({
    resolver: zodResolver(editDocRowFormSchema),
    defaultValues: {
      apparatus: undefined,
      can: undefined,
      conveyor: undefined,
      plan: undefined,
      note: undefined,
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
        apparatus: row.apparatus ?? undefined,
        can: row.can ?? undefined,
        conveyor: row.conveyor ?? undefined,
        plan: row.plan ?? undefined,
        note: row.note ?? undefined,
      });
    } else {
      reset({
        apparatus: undefined,
        can: undefined,
        conveyor: undefined,
        plan: undefined,
        note: undefined,
      });
    }
  }, [row, reset]);

  const apparatusValue = useWatch({ control, name: 'apparatus' });
  const canValue = useWatch({ control, name: 'can' });
  const conveyorValue = useWatch({ control, name: 'conveyor' });
  const planValue = useWatch({ control, name: 'plan' });

  const submitDisable =
    isSubmitting || !isDirty || !apparatusValue || !canValue || !conveyorValue || !planValue;
  const resetDisable = !isDirty || isSubmitting;

  async function onSubmit(data: EditDocRowFormValues) {
    if (!row) return;
    const dto: TApplicationUpdateDocRowInput = {
      id: row.id,
      apparatus: data.apparatus,
      can: data.can,
      conveyor: data.conveyor,
      plan: data.plan,
      note: data.note,
    };

    try {
      await updateDocRowAsync(dto);
      reset(data);
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
