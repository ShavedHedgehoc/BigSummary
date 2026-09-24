import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useWatch } from 'react-hook-form';
import { TCreateHistoryInput } from '@repo/schemas';
import { useCreateHistory } from './use-create-history';
import { changeStateFormSchema, ChangeStateFormValues } from '../lib/schema';
import { useMemo } from 'react';
import { useAuth } from '@/entities/user';
import { THistoryMutationContextProps } from '@/entities/history';
import { BOILS_OPTIONS, FOREMAN_OPTIONS, PRODUCTS_OPTIONS } from './constants';

export const useChangeStateForm = (props: THistoryMutationContextProps, onClose?: () => void) => {
  const { row, mode } = props;
  const { user } = useAuth();
  const { createHistoryAsync, isPending } = useCreateHistory();

  const form = useForm<ChangeStateFormValues>({
    resolver: zodResolver(changeStateFormSchema),
    defaultValues: {
      state: '',
      note: '',
    },
  });

  const {
    control,
    reset,
    formState: { isSubmitting, isDirty },
  } = form;

  const stateValue = useWatch({ control, name: 'state' });
  const noteValue = useWatch({ control, name: 'note' });

  const needFilledCommentValues = [
    'base_correct',
    'base_fail',
    'product_fail',
    'product_correct',
  ] as const;

  const isCommentRequired = Boolean(
    stateValue && (needFilledCommentValues as readonly string[]).includes(stateValue),
  );

  const submitDisable =
    isSubmitting ||
    isPending ||
    !isDirty ||
    !stateValue ||
    (!noteValue?.trim() && isCommentRequired);
  const resetDisable = !isDirty || isSubmitting;

  const currentStatus = row?.stateValue ?? '';

  const activeOptions = useMemo(() => {
    if (mode === 'laboratory_boils') {
      if (!currentStatus || currentStatus === '-' || currentStatus === 'base_fail') return [];
      if (currentStatus === 'base_check') {
        const allowed = ['base_correct', 'base_continue', 'plug_pass', 'base_fail'];
        return BOILS_OPTIONS.filter((o) => allowed.includes(o.value));
      }
      return BOILS_OPTIONS.filter((o) => o.value === 'base_fail');
    }

    if (mode === 'laboratory_products') {
      if (!currentStatus || currentStatus === '-') return [];
      if (currentStatus === 'product_check') {
        const allowed = ['product_correct', 'product_pass', 'product_fail'];
        return PRODUCTS_OPTIONS.filter((o) => allowed.includes(o.value));
      }
      return PRODUCTS_OPTIONS.filter((o) => o.value === 'product_fail');
    }

    if (mode === 'foreman') {
      if (!currentStatus || currentStatus === '-') return [];
      if (currentStatus === 'product_pass') {
        const allowed = ['product_in_progress'];
        return FOREMAN_OPTIONS.filter((o) => allowed.includes(o.value));
      }
      if (currentStatus === 'product_in_progress') {
        const allowed = ['product_finished'];
        return FOREMAN_OPTIONS.filter((o) => allowed.includes(o.value));
      }
      return [];
    }

    return [];
  }, [mode, currentStatus]);

  async function onSubmit(data: ChangeStateFormValues) {
    if (!row) return;

    try {
      if (mode === 'laboratory_boils') {
        const dto: TCreateHistoryInput = {
          record_id: null,
          boil_value: row.boilValue,
          base_code: null,
          plant_id: null,
          historyType: data.state,
          userId: user?.id ?? null,
          employeeId: null,
          note: null,
          history_note: data.note === '' ? null : data.note,
          code: null,
        };
        await createHistoryAsync(dto);
      }
      if (mode === 'laboratory_products' || mode === 'foreman') {
        const dto: TCreateHistoryInput = {
          record_id: row.id,
          boil_value: null,
          base_code: null,
          plant_id: null,
          historyType: data.state,
          userId: user?.id ?? null,
          employeeId: null,
          note: null,
          history_note: data.note === '' ? null : data.note,
          code: null,
        };
        await createHistoryAsync(dto);
      }
      if (onClose) {
        onClose();
      }

      reset(data);
    } catch (error) {
      console.error('Ошибка сохранения статуса:', error);
    }
  }

  return {
    form,
    onSubmit,
    submitDisable,
    resetDisable,
    isSubmitting,
    activeOptions,
  };
};
