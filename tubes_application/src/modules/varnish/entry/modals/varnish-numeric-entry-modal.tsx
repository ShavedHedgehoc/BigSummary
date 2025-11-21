import { useShallow } from "zustand/shallow";
import type { DataFormField } from "../../../../shared/helpers/data-form-field";
import NumericEntryModal, {
  type NumericEntryModalProps,
} from "../../../../shared/components/modals/numeric-entry-modal";
import { useVarnishNumericEntryModalStore } from "../../store/use-varnish-numeric-entry-modal-store";
import { useVarnishInputStore, VarnishInputParams } from "../../store/use-varnish-input-store";

export default function VarnishNumericEntryModal() {
  const id = useVarnishNumericEntryModalStore(useShallow((state) => state.key));
  const title = useVarnishNumericEntryModalStore(useShallow((state) => state.title));
  const open = useVarnishNumericEntryModalStore(useShallow((state) => state.open));
  const setOpen = useVarnishNumericEntryModalStore(useShallow((state) => state.setOpen));
  const dataKey = useVarnishNumericEntryModalStore(useShallow((state) => state.key));
  const minValue = useVarnishNumericEntryModalStore(useShallow((state) => state.minValue));
  const maxValue = useVarnishNumericEntryModalStore(useShallow((state) => state.maxValue));
  const unit = useVarnishNumericEntryModalStore(useShallow((state) => state.unit));
  const clearData = useVarnishInputStore(useShallow((state) => state.clearData));
  const changeData = useVarnishInputStore(useShallow((state) => state.changeData));
  const sliceData = useVarnishInputStore(useShallow((state) => state.sliceData));
  const roundData = useVarnishInputStore(useShallow((state) => state.roundData));

  const data = useVarnishInputStore(
    useShallow((state) => {
      switch (dataKey) {
        case VarnishInputParams.COUNTER_VALUE:
          return state.data.counter_value;
        case VarnishInputParams.VARNISH_MACHINE_SPEED:
          return state.data.varnish_machine_speed;
        case VarnishInputParams.TOTAL_AIR_PRESSURE:
          return state.data.total_air_pressure;
        case VarnishInputParams.FEED_CAN_AIR_PRESSURE:
          return state.data.feed_can_air_pressure;
        case VarnishInputParams.NOZZLE_REGULATOR_AIR_PRESSURE:
          return state.data.nozzle_regulator_air_pressure;
        case VarnishInputParams.CELLS_SPEED:
          return state.data.cells_speed;
        case VarnishInputParams.INJECTION_A_START_POSITION:
          return state.data.injection_a_start_position;
        case VarnishInputParams.INJECTION_B_START_POSITION:
          return state.data.injection_b_start_position;
        case VarnishInputParams.INJECTION_C_START_POSITION:
          return state.data.injection_c_start_position;
        case VarnishInputParams.INJECTION_D_START_POSITION:
          return state.data.injection_d_start_position;
        case VarnishInputParams.INJECTION_A_END_POSITION:
          return state.data.injection_a_end_position;
        case VarnishInputParams.INJECTION_B_END_POSITION:
          return state.data.injection_b_end_position;
        case VarnishInputParams.INJECTION_C_END_POSITION:
          return state.data.injection_c_end_position;
        case VarnishInputParams.INJECTION_D_END_POSITION:
          return state.data.injection_d_end_position;
        case VarnishInputParams.TUBE_MOLDING_START_POSITION:
          return state.data.tube_molding_start_position;
        case VarnishInputParams.TUBE_MOLDING_END_POSITION:
          return state.data.tube_molding_end_position;
        case VarnishInputParams.POLIMERIZATION_FURNACE_TEMP:
          return state.data.polimerization_furnace_temp;
        case VarnishInputParams.INTERNAL_VARNISH_POROSITY:
          return state.data.internal_varnish_porosity;
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
