import { useShallow } from "zustand/shallow";
import type { DataFormField } from "../../../common/data-form-field";

import NumericEntryModal, { type NumericEntryModalProps } from "../../../common/numeric-entry-modal";
import {
  useExtrusionInputCurrentParametersStore,
  CurrentParametersInputDataParams,
} from "../../store/use-extrusion-input-current-parameters-store";
import { useExtrusionNumericEntryModalStore } from "../../store/use-extrusion-numeric-entry-modal-store";

export default function ExtrusionNumericEntryModal() {
  const id = useExtrusionNumericEntryModalStore(useShallow((state) => state.key));
  const title = useExtrusionNumericEntryModalStore(useShallow((state) => state.title));
  const open = useExtrusionNumericEntryModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionNumericEntryModalStore(useShallow((state) => state.setOpen));
  const dataKey = useExtrusionNumericEntryModalStore(useShallow((state) => state.key));
  const minValue = useExtrusionNumericEntryModalStore(useShallow((state) => state.minValue));
  const maxValue = useExtrusionNumericEntryModalStore(useShallow((state) => state.maxValue));
  const unit = useExtrusionNumericEntryModalStore(useShallow((state) => state.unit));
  const clearData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.clearData));
  const changeData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.changeData));
  const sliceData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.sliceData));
  const roundData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.roundData));

  const data = useExtrusionInputCurrentParametersStore(
    useShallow((state) => {
      switch (dataKey) {
        case CurrentParametersInputDataParams.COUNTER_VALUE:
          return state.data.counter_value;
        case CurrentParametersInputDataParams.PRESS_SPEED:
          return state.data.press_speed;
        case CurrentParametersInputDataParams.BLOW_TIME:
          return state.data.blow_time;
        case CurrentParametersInputDataParams.TURNING_MACHINE_SPEED:
          return state.data.turning_machine_speed;
        case CurrentParametersInputDataParams.ANNEALING_FURNACE_TEMP:
          return state.data.annealing_furnace_temp;
        case CurrentParametersInputDataParams.TUBE_CILINDRICAL_SECTION_LENGTH:
          return state.data.tube_cilindrical_section_length;
        case CurrentParametersInputDataParams.MEMBRANE_THICKNESS:
          return state.data.membrane_thickness;
        case CurrentParametersInputDataParams.TUBE_DIAMETER:
          return state.data.tube_diameter;
        case CurrentParametersInputDataParams.TUBE_CILINDRICAL_THICKNESS:
          return state.data.tube_cilindrical_thikness;
        case CurrentParametersInputDataParams.TUBE_RIGIDITY:
          return state.data.tube_rigidity;
        default:
          break;
      }
    })
  );

  const numericEntrymodalProps: NumericEntryModalProps = {
    id: id,
    title: title,
    open: open,
    dataKey: dataKey,
    data: data,
    minValue: minValue,
    maxValue: maxValue,
    unit: unit,
    setOpen: (val: boolean) => setOpen(val),
    clearData: (val: Partial<DataFormField>) => clearData(val),
    changeData: (val: DataFormField) => changeData(val),
    sliceData: (val: Partial<DataFormField>) => sliceData(val),
    roundData: (val: Partial<DataFormField>) => roundData(val),
  };
  return <NumericEntryModal {...numericEntrymodalProps} />;
}
