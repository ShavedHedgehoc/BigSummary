import { zodResolver } from '@hookform/resolvers/zod';
import { TApplicationDocDetailRowItem, TCreateHistoryInput } from '@repo/schemas';
import { useForm, useWatch } from 'react-hook-form';
import { addHistoryFormSchema, AddHistoryFormValues } from '../lib';
import { useDirectAddHistory } from './use-direct-add-history';
import { useAuth } from '@/entities/user/index.client';
import { trpc } from '@/shared/api';
import React from 'react';
import { ISelectorWithIconListItem } from '@/shared/ui';

interface UseAddHistoryFormProps {
  row?: TApplicationDocDetailRowItem;
  onSuccess: () => void;
}
export const useAddHistoryForm = ({ row, onSuccess }: UseAddHistoryFormProps) => {
  const { user } = useAuth();
  const { data: statesData = [], isLoading: isStatesLoading } =
    trpc.application.main.historyType.getAllHistoryTypeList.useQuery(undefined, {
      staleTime: 5 * 60 * 1000,
    });
  const { directAddHistoryAsync: createHistoryAsync, isPending: createPending } =
    useDirectAddHistory();
  const form = useForm<AddHistoryFormValues>({
    resolver: zodResolver(addHistoryFormSchema),
    defaultValues: {
      state: undefined,
      note: undefined,
    },
  });
  const {
    control,
    reset,
    formState: { isSubmitting, isDirty },
  } = form;

  const stateValue = useWatch({ control, name: 'state' });
  const isPendingAction = isSubmitting || createPending;
  const submitDisable = isPendingAction || !isDirty || !stateValue;
  const resetDisable = !isDirty || isPendingAction;

  async function onSubmit(data: AddHistoryFormValues) {
    if (!row) return;
    const dto: TCreateHistoryInput = {
      record_id: row.id,
      boil_value: row.boil,
      base_code: null,
      code: null,
      historyType: data.state,
      userId: user?.id ?? null,
      employeeId: null,
      note: 'Внесено с помощью Godmode',
      plant_id: null,
      history_note: data.note ?? null,
    };
    try {
      await createHistoryAsync(dto);
      reset(data);
    } catch (error) {
      console.error('Ошибка сохранения:', error);
    } finally {
      onSuccess();
    }
  }

  const stateListItems = React.useMemo(() => {
    const isHasBase = row?.waterBaseId;

    const baseItems: ISelectorWithIconListItem[] = [{ value: 'All', description: 'Не выбрано' }];
    if (Array.isArray(statesData)) {
      const parsedStatesData = isHasBase ? statesData : statesData.filter((x) => !x.for_boil);
      baseItems.push(
        ...parsedStatesData.map((state) => ({
          value: state.value,
          description: state.description,
        })),
      );
    }
    return baseItems;
  }, [statesData, row?.waterBaseId]);

  return {
    form,
    onSubmit,
    submitDisable,
    resetDisable,
    isSubmitting: isPendingAction,
    states: stateListItems,
    isStatesLoading,
  };
};
