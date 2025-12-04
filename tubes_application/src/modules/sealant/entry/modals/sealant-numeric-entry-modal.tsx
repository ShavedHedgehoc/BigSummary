import { useShallow } from "zustand/shallow";
import type { DataFormField } from "../../../../shared/helpers/data-form-field";
import NumericEntryModal, {
  type NumericEntryModalProps,
} from "../../../../shared/components/modals/numeric-entry-modal";
import { useSealantNumericEntryModalStore } from "../../store/use-sealant-numeric-entry-modal-store";
import { useSealantInputStore, SealantInputParams } from "../../store/use-sealant-input-store";

export default function SealantNumericEntryModal() {
  const id = useSealantNumericEntryModalStore(useShallow((state) => state.key));
  const title = useSealantNumericEntryModalStore(useShallow((state) => state.title));
  const open = useSealantNumericEntryModalStore(useShallow((state) => state.open));
  const setOpen = useSealantNumericEntryModalStore(useShallow((state) => state.setOpen));
  const dataKey = useSealantNumericEntryModalStore(useShallow((state) => state.key));
  const minValue = useSealantNumericEntryModalStore(useShallow((state) => state.minValue));
  const maxValue = useSealantNumericEntryModalStore(useShallow((state) => state.maxValue));
  const unit = useSealantNumericEntryModalStore(useShallow((state) => state.unit));
  const clearData = useSealantInputStore(useShallow((state) => state.clearData));
  const changeData = useSealantInputStore(useShallow((state) => state.changeData));
  const sliceData = useSealantInputStore(useShallow((state) => state.sliceData));
  const roundData = useSealantInputStore(useShallow((state) => state.roundData));

  const data = useSealantInputStore(
    useShallow((state) => {
      switch (dataKey) {
        // case SealantInputParams.COUNTER_VALUE:
        //   return state.data.counter_value;
        // case SealantInputParams.CAP_MACHINE_SPEED:
        //   return state.data.cap_machine_speed;
        case SealantInputParams.TOTAL_AIR_PRESSURE:
          return state.data.total_air_pressure;
        // case SealantInputParams.HOLDERS_FORWARD:
        //   return state.data.holders_forward;
        // case SealantInputParams.HOLDERS_OPENING_LEFT:
        //   return state.data.holders_opening_left;
        // case SealantInputParams.HOLDERS_OPENING_RIGHT:
        //   return state.data.holders_opening_right;
        // case SealantInputParams.HOLDERS_CLOSING:
        //   return state.data.holders_closing;
        // case SealantInputParams.INJECTION_A_START:
        //   return state.data.injection_a_start;
        // case SealantInputParams.INJECTION_B_START:
        //   return state.data.injection_b_start;
        // case SealantInputParams.INJECTION_A_END:
        //   return state.data.injection_a_end;
        // case SealantInputParams.INJECTION_B_END:
        //   return state.data.injection_b_end;
        // case SealantInputParams.INJECTION_TUBE_ORIENTATION_START:
        //   return state.data.injection_tube_orientation_start;
        // case SealantInputParams.INJECTION_TUBE_ORIENTATION_END:
        //   return state.data.injection_tube_orientation_end;
        // case SealantInputParams.LATEX_RING_PADDING:
        //   return state.data.latex_ring_padding;
        // case SealantInputParams.LATEX_RING_WIDTH:
        //   return state.data.latex_ring_width;
        // case SealantInputParams.TUBE_RIGIDITY:
        //   return state.data.tube_rigidity;
        // case SealantInputParams.CAP_UNSCREWING_TORQUE:
        //   return state.data.cap_unscrewing_torque;
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
