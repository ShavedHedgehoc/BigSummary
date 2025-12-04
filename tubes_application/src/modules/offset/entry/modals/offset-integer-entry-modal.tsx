import { useShallow } from "zustand/shallow";
import type { DataFormField } from "../../../../shared/helpers/data-form-field";

import IntegerEntryModal, {
  type IntegerEntryModalProps,
} from "../../../../shared/components/modals/integer-entry-modal";
import { useOffsetIntegerEntryModalStore } from "../../store/use-offset-integer-entry-modal-store";
import { OffsetInputParams, useOffsetInputStore } from "../../store/use-offset-input-store";

export default function OffsetIntegerEntryModal() {
  const id = useOffsetIntegerEntryModalStore(useShallow((state) => state.key));
  const title = useOffsetIntegerEntryModalStore(useShallow((state) => state.title));
  const open = useOffsetIntegerEntryModalStore(useShallow((state) => state.open));
  const setOpen = useOffsetIntegerEntryModalStore(useShallow((state) => state.setOpen));
  const dataKey = useOffsetIntegerEntryModalStore(useShallow((state) => state.key));
  const minValue = useOffsetIntegerEntryModalStore(useShallow((state) => state.minValue));
  const maxValue = useOffsetIntegerEntryModalStore(useShallow((state) => state.maxValue));
  const unit = useOffsetIntegerEntryModalStore(useShallow((state) => state.unit));
  const clearData = useOffsetInputStore(useShallow((state) => state.clearData));
  const changeData = useOffsetInputStore(useShallow((state) => state.changeData));
  const sliceData = useOffsetInputStore(useShallow((state) => state.sliceData));
  const roundData = useOffsetInputStore(useShallow((state) => state.roundData));

  const data = useOffsetInputStore(
    useShallow((state) => {
      switch (dataKey) {
        case OffsetInputParams.COUNTER_VALUE:
          return state.data.counter_value;
        case OffsetInputParams.PRINTING_MACHINE_SPEED:
          return state.data.printing_machine_speed;
        // case OffsetInputParams.TOTAL_AIR_PRESSURE:
        //   return state.data.total_air_pressure;
        case OffsetInputParams.PADDING_FURNACE_TEMP:
          return state.data.padding_furnace_temp;
        case OffsetInputParams.OFFSET_FURNACE_TEMP:
          return state.data.offset_furnace_temp;
        case OffsetInputParams.PRINTER_MOTOR:
          return state.data.printer_motor;
        case OffsetInputParams.BASE_COVERS_HOLDERS_MOTOR:
          return state.data.base_covers_holders_motor;
        case OffsetInputParams.BASE_COVERS_STATION_MOTOR:
          return state.data.base_covers_station_motor;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_1:
          return state.data.imprint_quantity_printed_box_1;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_2:
          return state.data.imprint_quantity_printed_box_2;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_3:
          return state.data.imprint_quantity_printed_box_3;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_4:
          return state.data.imprint_quantity_printed_box_4;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_5:
          return state.data.imprint_quantity_printed_box_5;
        case OffsetInputParams.IMPRINT_QUANTITY_PRINTED_BOX_6:
          return state.data.imprint_quantity_printed_box_6;
        // case OffsetInputParams.INK_SUPPLY_TIME:
        //   return state.data.ink_supply_time;
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
