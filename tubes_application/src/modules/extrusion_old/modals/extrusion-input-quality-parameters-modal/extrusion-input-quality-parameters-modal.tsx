import { useShallow } from "zustand/react/shallow";
import type { InputModalProps } from "@/shared/components/modals/input-modal";
import InputModal from "@/shared/components/modals/input-modal";
import { useExtrusionInputQualityParametersModalStore } from "../../store/use-extrusion-input-quality-parameters-modal-store";
// import {
//   CurrentParametersInputDataParams,
//   useExtrusionInputCurrentParametersStore,
// } from "../../store/use-extrusion-input-current-parameters-store";
// import InputWithPopoverNumpad, {
//   type InputWithPopoverNumpadProps,
// } from "@/shared/components/ui/input-with-popover-numpad";
// import { Button, HStack, Span, Stack } from "@chakra-ui/react";
// import InputModal, { type InputModalProps } from "@/shared/components/modals/input-modal";
// import { TbDeviceFloppy } from "react-icons/tb";
// import type { CreateExtrusionParamsRecordDto } from "@/shared/api/services/extrusion-service";
// import { useExtrusionEmployeeStore } from "../../store/use-extrusion-employee-store";
// import { useExtrusionInputParametersAlertModalStore } from "../../store/use-extrusion-input-parameters-alert-modal-store";
// import { CountersTresholds } from "@/shared/helpers/counters-tresholds";
// import InputSelector, { type InputSelectorProps } from "@/shared/components/ui/input-selector";
// import { useQuery } from "@tanstack/react-query";
// import RondelTypeService from "@/shared/api/services/rondel-type-service";
// import { useExtrusionHardwareTresholds } from "../../hooks/use-extrusion-hardware-tresholds";
// import { useCreateHardwareParameterCurrent } from "../../hooks/use-extrusion-create-hardware-parameter";

export default function ExtrusionInputQualityParametersModal({
  summary_id,
  production_id,
}: {
  summary_id: number | undefined;
  production_id: number | undefined;
}) {
  const open = useExtrusionInputQualityParametersModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionInputQualityParametersModalStore(useShallow((state) => state.setOpen));
  // const setOpenAlert = useExtrusionInputParametersAlertModalStore(useShallow((state) => state.setOpen));
  // const setAlertDto = useExtrusionInputParametersAlertModalStore(useShallow((state) => state.setDto));
  // const employee = useExtrusionEmployeeStore(useShallow((state) => state.extrusionEmployee));
  // const { data: parametersData } = useExtrusionHardwareTresholds(production_id ? production_id : null);
  // const data = useExtrusionInputCurrentParametersStore(useShallow((state) => state.data));
  // const clearData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.clearData));
  // const changeData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.changeData));
  // const sliceData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.sliceData));
  // const roundData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.roundData));
  // const initData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.initData));
  // const { createHardwareParameterCurrent } = useCreateHardwareParameterCurrent();
  // const selectedRondelType = useExtrusionInputCurrentParametersStore(useShallow((state) => state.selectedRondelType));
  // const setSelectedRondelType = useExtrusionInputCurrentParametersStore(
  //   useShallow((state) => state.setSelectedRondelType)
  // );
  // const fillRondelTypeSelectorOptions = useExtrusionInputCurrentParametersStore(
  //   useShallow((state) => state.fillRondelTypeSelectorOptions)
  // );
  // const rondelTypeSelectorOptions = useExtrusionInputCurrentParametersStore(
  //   useShallow((state) => state.rondelTypeSelectorOptions)
  // );

  // const saveButtonDisabledCondition =
  //   data.counter_value === "0" ||
  //   data.annealing_furnace_temp === "0" ||
  //   data.blow_time === "0" ||
  //   data.press_speed === "0" ||
  //   data.turning_machine_speed === "0" ||
  //   data.rondel_type_id === null;

  // const alertDialogCondition =
  //   parametersData &&
  //   (Number(data.annealing_furnace_temp) < parametersData.annealing_furnace_temp_min ||
  //     Number(data.annealing_furnace_temp) > parametersData.annealing_furnace_temp_max ||
  //     Number(data.blow_time) < parametersData.blow_time_min ||
  //     Number(data.blow_time) > parametersData.blow_time_max ||
  //     Number(data.press_speed) < parametersData.press_speed_min ||
  //     Number(data.press_speed) > parametersData.press_speed_max ||
  //     Number(data.turning_machine_speed) < parametersData.turning_machine_speed_min ||
  //     Number(data.turning_machine_speed) > parametersData.turning_machine_speed_max ||
  //     Number(data.rondel_type_id) !== parametersData.rondel_type_id ||
  //     Number(data.counter_value) > CountersTresholds.COUNTERS_MAX_TRESHOLD ||
  //     Number(data.counter_value) < CountersTresholds.COUNTERS_MIN_TRESHOLD);

  // const handleSaveClick = () => {
  //   if (summary_id && data && employee) {
  //     const dto: CreateExtrusionParamsRecordDto = {
  //       summary_id: summary_id,
  //       counter_value: Number(data.counter_value),
  //       press_speed: Number(data.press_speed),
  //       blow_time: Number(data.blow_time),
  //       turning_machine_speed: Number(data.turning_machine_speed),
  //       annealing_furnace_temp: Number(data.annealing_furnace_temp),
  //       employee_id: employee.id,
  //       rondel_type_id: Number(data.rondel_type_id),
  //     };
  //     if (alertDialogCondition) {
  //       setAlertDto(dto);
  //       setOpenAlert(true);
  //       return;
  //     }
  //     setOpen(false);
  //     createHardwareParameterCurrent(dto);
  //     initData();
  //   }
  // };

  // const ModalButtons = () => (
  //   <Button bg="brand" variant="outline" disabled={saveButtonDisabledCondition} onClick={() => handleSaveClick()}>
  //     <TbDeviceFloppy /> Сохранить
  //   </Button>
  // );
  const modalProps: InputModalProps = {
    title: "Входной контроль",
    open: open,
    setOpen: (val) => setOpen(val),
    // initData: () => initData(),
    // buttons: <ModalButtons />,
    initData: () => null,
    buttons: <></>,
  };

  // const popoverProps: Partial<In putWithPopoverNumpadProps> &
  //   Pick<InputWithPopoverNumpadProps, "changeData" | "clearData" | "sliceData" | "roundData"> = {
  //   changeData: ({ key, value }: { key: string; value: string }) => changeData({ key, value }),
  //   clearData: ({ key }: { key: string }) => clearData({ key }),
  //   sliceData: ({ key }: { key: string }) => sliceData({ key }),
  //   roundData: ({ key }: { key: string }) => roundData({ key }),
  // };

  // useQuery({
  //   queryKey: ["rondels"],
  //   queryFn: async () => {
  //     const data = await RondelTypeService.getAllRondelTypes();
  //     if (data) {
  //       fillRondelTypeSelectorOptions(data);
  //       return data;
  //     }
  //   },
  // });

  // const options = rondelTypeSelectorOptions.map((item) => ({ label: item.value, value: item.id.toString() }));

  // const selectorProps: InputSelectorProps = {
  //   id: CurrentParametersInputDataParams.RONDEL_TYPE,
  //   selectedOption: selectedRondelType,
  //   title: "Тип рондоли",
  //   placeholder: "Выберите тип",
  //   defaultValue: parametersData?.rondel_type.value,
  //   defaultId: parametersData?.rondel_type_id,
  //   options: options,
  //   setSelectedOption: (value: string[] | undefined) => setSelectedRondelType(value),
  //   changeData: ({ key, value, values }: { key: string; value: string; values: string[] | [] }) =>
  //     changeData({ key, value, values }),
  // };

  return (
    <InputModal props={modalProps}>
      <>
        {summary_id} {production_id}
      </>
      {/* <Stack>
        <HStack justify="space-between">
          <InputWithPopoverNumpad
            props={{
              id: CurrentParametersInputDataParams.COUNTER_VALUE,
              title: "Показания счетчика",
              value: data.counter_value,
              minValue: CountersTresholds.COUNTERS_MIN_TRESHOLD,
              maxValue: CountersTresholds.COUNTERS_MAX_TRESHOLD,
              unit: "",
              isNotReglament: true,
              ...popoverProps,
            }}
          />
          <Span />
        </HStack>
        <HStack justify="space-between">
          <InputWithPopoverNumpad
            props={{
              id: CurrentParametersInputDataParams.PRESS_SPEED,
              title: "Скорость пресса",
              value: data.press_speed,
              minValue: parametersData?.press_speed_min ?? 0,
              maxValue: parametersData?.press_speed_max ?? 0,
              unit: "шт/мин",
              ...popoverProps,
            }}
          />
          <InputWithPopoverNumpad
            props={{
              id: CurrentParametersInputDataParams.BLOW_TIME,
              title: "Время выдува",
              value: data.blow_time,
              minValue: parametersData?.blow_time_min ?? 0,
              maxValue: parametersData?.blow_time_max ?? 0,
              unit: "мс",
              ...popoverProps,
            }}
          />
          <InputWithPopoverNumpad
            props={{
              id: CurrentParametersInputDataParams.TURNING_MACHINE_SPEED,
              title: "Скорость токарного автомата",
              value: data.turning_machine_speed,
              minValue: parametersData?.turning_machine_speed_min ?? 0,
              maxValue: parametersData?.turning_machine_speed_max ?? 0,
              unit: "шт/мин",
              ...popoverProps,
            }}
          />
          <InputWithPopoverNumpad
            props={{
              id: CurrentParametersInputDataParams.ANNEALING_FURNACE_TEMP,
              title: "Температура печи отжига",
              value: data.annealing_furnace_temp,
              minValue: parametersData?.annealing_furnace_temp_min ?? 0,
              maxValue: parametersData?.annealing_furnace_temp_max ?? 0,
              unit: "C",
              ...popoverProps,
            }}
          />
          <InputSelector {...selectorProps} />
        </HStack>
      </Stack> */}
    </InputModal>
  );
}
