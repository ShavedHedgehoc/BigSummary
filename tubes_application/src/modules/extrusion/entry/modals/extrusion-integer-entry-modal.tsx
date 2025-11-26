import { useShallow } from "zustand/shallow";
import type { DataFormField } from "../../../../shared/helpers/data-form-field";
import { useExtrusionInputStore, ExtrusionInputParams } from "../../store/use-extrusion-input-current-parameters-store";
import IntegerEntryModal, { type IntegerEntryModalProps } from "@/shared/components/modals/integer-entry-modal";
import { useExtrusionIntegerEntryModalStore } from "../../store/use-extrusion-integer-entry-modal-store";

export default function ExtrusionIntegerEntryModal() {
  const id = useExtrusionIntegerEntryModalStore(useShallow((state) => state.key));
  const title = useExtrusionIntegerEntryModalStore(useShallow((state) => state.title));
  const open = useExtrusionIntegerEntryModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionIntegerEntryModalStore(useShallow((state) => state.setOpen));
  const dataKey = useExtrusionIntegerEntryModalStore(useShallow((state) => state.key));
  const minValue = useExtrusionIntegerEntryModalStore(useShallow((state) => state.minValue));
  const maxValue = useExtrusionIntegerEntryModalStore(useShallow((state) => state.maxValue));
  const unit = useExtrusionIntegerEntryModalStore(useShallow((state) => state.unit));
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
        // case ExtrusionInputParams.MEMBRANE_THICKNESS:
        //   return state.data.membrane_thickness;
        // case ExtrusionInputParams.TUBE_DIAMETER:
        //   return state.data.tube_diameter;
        // case ExtrusionInputParams.TUBE_CILINDRICAL_THICKNESS:
        //   return state.data.tube_cilindrical_thikness;
        case ExtrusionInputParams.TUBE_RIGIDITY:
          return state.data.tube_rigidity;
        default:
          break;
      }
    })
  );

  const integerEntrymodalProps: IntegerEntryModalProps = {
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
  return <IntegerEntryModal {...integerEntrymodalProps} />;
}
