import { TCreateHistoryInput } from '@repo/schemas';
import { TCancelHistoryButtonUiProps } from './types';
import { useAuth, useRoles } from '@/entities/user';
import { DB_ROLES } from '@/shared/constants';
import { useUndoHistory } from './use-undo-history';

export const useUndoButton = (props: TCancelHistoryButtonUiProps) => {
  const { user } = useAuth();
  const { hasRole } = useRoles();
  const { undoHistory, isPending } = useUndoHistory();
  const allowLabCancel = hasRole(DB_ROLES.LABORATORY);
  const allowForemanCancel = hasRole(DB_ROLES.FOREMAN);

  const labBoilCancelStates = ['base_correct', 'base_fail', 'plug_pass', 'base_continue'];
  const labProductCancelStates = ['product_correct', 'product_fail', 'product_pass'];
  const foremanCancelStates = ['product_in_progress', 'product_finished'];
  const lastState = props.row?.stateValue ?? '-';
  const isStateCancellable =
    (props.mode === 'laboratory_boils' && labBoilCancelStates.includes(lastState)) ||
    (props.mode === 'laboratory_products' && labProductCancelStates.includes(lastState)) ||
    (props.mode === 'foreman' && foremanCancelStates.includes(lastState));

  const isButtonDisabled = isPending || !isStateCancellable;
  const isVisible = Boolean(
    props.row &&
    lastState !== '-' &&
    ((allowLabCancel && props.mode === 'laboratory_boils') ||
      (allowLabCancel && props.mode === 'laboratory_products') ||
      (allowForemanCancel && props.mode === 'foreman')),
  );
  const handleClick = () => {
    if (!props.row) return;
    if (props.mode === 'laboratory_boils') {
      const dto: TCreateHistoryInput = {
        record_id: null,
        boil_value: props.row.boilValue,
        base_code: null,
        plant_id: null,
        historyType: 'base_check',
        userId: user?.id ?? null,
        employeeId: null,
        note: null,
        history_note: 'Отмена ошибочного внесения',
        code: null,
      };
      undoHistory(dto);
    }

    if (props.mode === 'laboratory_products') {
      const dto: TCreateHistoryInput = {
        record_id: props.row.id,
        boil_value: null,
        base_code: null,
        plant_id: null,
        historyType: 'product_check',
        userId: user?.id ?? null,
        employeeId: null,
        note: null,
        history_note: 'Отмена ошибочного внесения',
        code: null,
      };
      undoHistory(dto);
    }
    if (props.mode === 'foreman' && lastState === 'product_in_progress') {
      const dto: TCreateHistoryInput = {
        record_id: props.row.id,
        boil_value: null,
        base_code: null,
        plant_id: null,
        historyType: 'product_check',
        userId: user?.id ?? null,
        employeeId: null,
        note: null,
        history_note: 'Отмена ошибочного внесения',
        code: null,
      };
      undoHistory(dto);
    }
    if (props.mode === 'foreman' && lastState === 'product_finished') {
      const dto: TCreateHistoryInput = {
        record_id: props.row.id,
        boil_value: null,
        base_code: null,
        plant_id: null,
        historyType: 'product_in_progress',
        userId: user?.id ?? null,
        employeeId: null,
        note: null,
        history_note: 'Отмена ошибочного внесения',
        code: null,
      };
      undoHistory(dto);
    }
    if (props.onClose) {
      props.onClose();
    }
  };
  return {
    handleClick,
    isButtonDisabled,
    isVisible,
  };
};
