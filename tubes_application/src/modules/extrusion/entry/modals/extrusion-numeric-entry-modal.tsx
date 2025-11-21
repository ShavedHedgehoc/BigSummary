import { useShallow } from "zustand/shallow";
import type { DataFormField } from "../../../../shared/helpers/data-form-field";

import NumericEntryModal, {
  type NumericEntryModalProps,
} from "../../../../shared/components/modals/numeric-entry-modal";
import { useExtrusionInputStore, ExtrusionInputParams } from "../../store/use-extrusion-input-current-parameters-store";
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
  const clearData = useExtrusionInputStore(useShallow((state) => state.clearData));
  const changeData = useExtrusionInputStore(useShallow((state) => state.changeData));
  const sliceData = useExtrusionInputStore(useShallow((state) => state.sliceData));
  const roundData = useExtrusionInputStore(useShallow((state) => state.roundData));

  const data = useExtrusionInputStore(
    useShallow((state) => {
      switch (dataKey) {
        case ExtrusionInputParams.COUNTER_VALUE:
          return state.data.counter_value;
        case ExtrusionInputParams.PRESS_SPEED:
          return state.data.press_speed;
        case ExtrusionInputParams.BLOW_TIME:
          return state.data.blow_time;
        case ExtrusionInputParams.TURNING_MACHINE_SPEED:
          return state.data.turning_machine_speed;
        case ExtrusionInputParams.ANNEALING_FURNACE_TEMP:
          return state.data.annealing_furnace_temp;
        case ExtrusionInputParams.TUBE_CILINDRICAL_SECTION_LENGTH:
          return state.data.tube_cilindrical_section_length;
        case ExtrusionInputParams.MEMBRANE_THICKNESS:
          return state.data.membrane_thickness;
        case ExtrusionInputParams.TUBE_DIAMETER:
          return state.data.tube_diameter;
        case ExtrusionInputParams.TUBE_CILINDRICAL_THICKNESS:
          return state.data.tube_cilindrical_thikness;
        case ExtrusionInputParams.TUBE_RIGIDITY:
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
