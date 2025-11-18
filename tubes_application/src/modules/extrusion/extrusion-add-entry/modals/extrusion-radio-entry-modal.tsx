import type { DataFormField } from "@/modules/common/data-form-field";
import { useShallow } from "zustand/shallow";
import {
  useExtrusionInputCurrentParametersStore,
  CurrentParametersInputDataParams,
} from "../../store/use-extrusion-input-current-parameters-store";
import { useExtrusionRadioEntryModalStore } from "../../store/use-extrusion-radio-entry-modal-store";
import type { RadioEntryModalProps } from "@/modules/common/radio-entry-modal";
import RadioEntryModal from "@/modules/common/radio-entry-modal";

export default function ExtrusionRadioEntryModal() {
  const id = useExtrusionRadioEntryModalStore(useShallow((state) => state.key));
  const title = useExtrusionRadioEntryModalStore(useShallow((state) => state.title));
  const open = useExtrusionRadioEntryModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionRadioEntryModalStore(useShallow((state) => state.setOpen));
  const dataKey = useExtrusionRadioEntryModalStore(useShallow((state) => state.key));
  const changeData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.changeData));

  const data = useExtrusionInputCurrentParametersStore(
    useShallow((state) => {
      switch (dataKey) {
        case CurrentParametersInputDataParams.RONDEL_TYPE:
          //   return state.data.rondel_type_id;
          return state.data.rondel_type;

        default:
          break;
      }
    })
  );

  const radioEntryModalProps: RadioEntryModalProps = {
    id: id,
    title: title,
    open: open,
    dataKey: dataKey,
    data: data,
    setOpen: (val: boolean) => setOpen(val),
    changeData: (val: DataFormField) => changeData(val),
  };
  return <RadioEntryModal {...radioEntryModalProps} />;
}
