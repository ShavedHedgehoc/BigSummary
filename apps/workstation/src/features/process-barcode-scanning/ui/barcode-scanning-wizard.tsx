import * as React from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Box, Typography } from '@mui/joy';
import { MainInput, LoadingComponent } from '@/shared/ui';
import { ProcessMessages } from '@/shared/config';
import { checkBarcode, parseBoilCard, parseProductCard } from '@/shared/lib';
import { useEmployeeStore } from '@/entities/employee';
import { useRelatedRecordsStore } from '@/entities/record';
import { useConveyorStore } from '@/entities/conveyor';
import { MessageWindow } from './message-window';
import { TCreateHistoryInput } from '@repo/schemas';
import { useHistoriesStore } from '@/entities/history/model/use-history-store';
import { trpc } from '@/shared/api';

interface IBarcodeScanningWizard {
  plantId: number;
}

export function BarcodeScanningWizard({ plantId }: IBarcodeScanningWizard) {
  const utils = trpc.useUtils();

  const { employee, employeePending, getEmployeeByBarcode, clearEmployee } = useEmployeeStore(
    useShallow((state) => ({
      employee: state.employee,
      employeePending: state.pending,
      getEmployeeByBarcode: state.getEmployeeByBarcode,
      clearEmployee: state.clearEmployee,
    })),
  );

  const { conveyorPending, getConveyorByBarcode, clearConveyor } = useConveyorStore(
    useShallow((state) => ({
      conveyorPending: state.pending,
      getConveyorByBarcode: state.getConveyorByBarcode,
      clearConveyor: state.clearConveyor,
    })),
  );

  const { records, recordsPending, fetchRelatedRecords, clearRelatedRecords } =
    useRelatedRecordsStore(
      useShallow((state) => ({
        records: state.records,
        recordsPending: state.pending,
        fetchRelatedRecords: state.fetchRelatedRecords,
        clearRelatedRecords: state.clearRelatedRecords,
      })),
    );

  const { historyPending, addHistories } = useHistoriesStore(
    useShallow((state) => ({
      historyPending: state.pending,
      addHistories: state.addHistories,
    })),
  );

  const [showMessage, setShowMessage] = React.useState(false);
  const [infoMessage, setInfoMessage] = React.useState<string>('');
  const [severity, setSeverity] = React.useState<'fail' | 'success'>('fail');

  const showInfo = React.useCallback((msg: string, currentSeverity: 'fail' | 'success') => {
    setShowMessage(true);
    setSeverity(currentSeverity);
    setInfoMessage(msg);
    setTimeout(() => {
      setShowMessage(false);
      setInfoMessage('');
    }, 3000);
  }, []);

  const processMessage = React.useCallback(
    (msg: string, currentSeverity: 'fail' | 'success') => {
      showInfo(msg, currentSeverity);
      clearEmployee();
      clearConveyor();
      clearRelatedRecords();
    },
    [showInfo, clearEmployee, clearConveyor, clearRelatedRecords],
  );

  const processHistory = React.useCallback(
    async (payload: TCreateHistoryInput) => {
      const success = await addHistories(payload);
      if (!success) {
        const actualError = useHistoriesStore.getState().error;
        processMessage(actualError || 'Произошла ошибка', 'fail');
      } else {
        processMessage(ProcessMessages.SUCCESS_ADD, 'success');
        utils.workstation.history.getLastEmployeeHistoriesByPlantId.invalidate({
          plantId: plantId,
        });
      }
    },
    [
      addHistories,
      processMessage,
      plantId,
      utils.workstation.history.getLastEmployeeHistoriesByPlantId,
    ],
  );

  const processBoilCard = React.useCallback(
    async (value: string) => {
      if (!employee) return processMessage(ProcessMessages.EMPLOYEE_UNDEFINED, 'fail');
      const [boil, baseCode] = parseBoilCard(value);
      if (boil && baseCode) {
        const payload: TCreateHistoryInput = {
          record_id: null,
          boil_value: boil,
          code: null,
          base_code: baseCode,
          plant_id: plantId,
          historyType: 'base_check',
          userId: null,
          employeeId: employee.id,
          note: ProcessMessages.NOTE,
          history_note: null,
        };
        await processHistory(payload);
        return;
      }
      processMessage(ProcessMessages.NOT_BOIL_BARCODE, 'fail');
    },
    [employee, processMessage, processHistory, plantId],
  );

  const processConveyor = React.useCallback(
    async (value: string) => {
      if (!employee) return processMessage(ProcessMessages.EMPLOYEE_UNDEFINED, 'fail');
      await getConveyorByBarcode(value);
      const { conveyor: updatedConveyor, error: updatedConveyorError } =
        useConveyorStore.getState();
      const { records: relatedRecords } = useRelatedRecordsStore.getState();
      if (updatedConveyorError) {
        processMessage(updatedConveyorError, 'fail');
        return;
      }
      if (!updatedConveyor) {
        processMessage(ProcessMessages.CONVEYOR_NOT_FOUND, 'fail');
        return;
      }
      const relatedRecord = relatedRecords.filter((item) => item.conveyorId === updatedConveyor.id);
      if (relatedRecord.length > 0) {
        const payload: TCreateHistoryInput = {
          record_id: relatedRecord[0].id,
          boil_value: null,
          code: null,
          base_code: null,
          plant_id: plantId,
          userId: null,
          employeeId: employee.id,
          historyType: 'product_check',
          note: ProcessMessages.NOTE,
          history_note: null,
        };
        await processHistory(payload);
        return;
      }
      processMessage(ProcessMessages.RECORD_NOT_FOUND, 'fail');
      return;
    },
    [employee, getConveyorByBarcode, plantId, processHistory, processMessage],
  );

  const processProductCard = React.useCallback(
    async (value: string) => {
      if (!employee) return processMessage(ProcessMessages.EMPLOYEE_UNDEFINED, 'fail');
      const [code, boil] = parseProductCard(value);
      if (code && boil) {
        await fetchRelatedRecords({ code, plantId, boilValue: boil });
        const { records: updatedRecords } = useRelatedRecordsStore.getState();
        if (updatedRecords.length === 0) {
          return processMessage(ProcessMessages.RECORD_NOT_FOUND, 'fail');
        } else if (updatedRecords.length > 1) {
          return;
        } else {
          const payload: TCreateHistoryInput = {
            record_id: null,
            boil_value: boil,
            code: code,
            base_code: null,
            plant_id: plantId,
            userId: null,
            employeeId: employee.id,
            historyType: 'product_check',
            note: ProcessMessages.NOTE,
            history_note: null,
          };
          await processHistory(payload);
          return;
        }
      }
      processMessage(ProcessMessages.NOT_PRODUCT_BARCODE, 'fail');
    },
    [employee, fetchRelatedRecords, processMessage, processHistory, plantId],
  );

  const processBarcode = React.useCallback(
    async (value: string) => {
      if (!checkBarcode(value)) {
        processMessage(ProcessMessages.NOT_USER_BARCODE, 'fail');
        return;
      }
      await getEmployeeByBarcode(value);
      const { employee: updatedEmployee, error: updatedError } = useEmployeeStore.getState();

      if (updatedError) {
        processMessage(updatedError, 'fail');
        return;
      }
      if (!updatedEmployee) {
        processMessage(ProcessMessages.USER_NOT_FOUND, 'fail');
        return;
      }
      if (!updatedEmployee.occupations) {
        processMessage(ProcessMessages.ROLE_NOT_FOUND, 'fail');
        return;
      }
    },
    [getEmployeeByBarcode, processMessage],
  );

  const handleInput = React.useCallback(
    async (value: string) => {
      if (employee) {
        if (records.length > 1) {
          await processConveyor(value);
        } else {
          if (employee.occupations?.value === 'TECHNOLOGIST') await processBoilCard(value);
          if (employee.occupations?.value === 'OPERATOR') await processProductCard(value);
        }
      } else {
        await processBarcode(value);
      }
    },
    [
      employee,
      records.length,
      processConveyor,
      processBoilCard,
      processProductCard,
      processBarcode,
    ],
  );

  const pending = employeePending || historyPending || conveyorPending || recordsPending;

  if (pending) return <LoadingComponent />;
  if (showMessage) return <MessageWindow severity={severity} infoMessage={infoMessage} />;

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography level="h3" color="warning">
          {employee
            ? records.length > 1
              ? 'Требуется выбор конвейера'
              : `Пользователь: ${employee.name}`
            : 'Требуется авторизация'}
        </Typography>
      </Box>

      <Box sx={{ ml: 30, mr: 30 }}>
        <MainInput handleInput={handleInput} isDisable={showMessage} />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography level="h4">
          {!employee
            ? ProcessMessages.BARCODE_SCAN_PROMPT
            : records.length > 1
              ? ProcessMessages.CONVEYOR_SCAN_PROMPT
              : employee.occupations?.value === 'TECHNOLOGIST'
                ? ProcessMessages.BOIL_CARD_SCAN_PROMPT
                : ProcessMessages.LABEL_SCAN_PROMPT}
        </Typography>
      </Box>
    </React.Fragment>
  );
}
