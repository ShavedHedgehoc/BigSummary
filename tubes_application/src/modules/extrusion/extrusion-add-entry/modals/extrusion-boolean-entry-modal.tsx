import BooleanEntryModal, { type BooleanEntryModalProps } from "@/modules/common/boolean-entry-modal";
import type { DataFormField } from "@/modules/common/data-form-field";
import { useShallow } from "zustand/shallow";
import {
  useExtrusionInputCurrentParametersStore,
  CurrentParametersInputDataParams,
} from "../../store/use-extrusion-input-current-parameters-store";
import { useExtrusionBooleanEntryModalStore } from "../../store/use-extrusion-boolean-entry-modal-store";

export default function ExtrusionBooleanEntryModal() {
  const id = useExtrusionBooleanEntryModalStore(useShallow((state) => state.key));
  const title = useExtrusionBooleanEntryModalStore(useShallow((state) => state.title));
  const open = useExtrusionBooleanEntryModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionBooleanEntryModalStore(useShallow((state) => state.setOpen));
  const dataKey = useExtrusionBooleanEntryModalStore(useShallow((state) => state.key));
  const changeData = useExtrusionInputCurrentParametersStore(useShallow((state) => state.changeData));

  const data = useExtrusionInputCurrentParametersStore(
    useShallow((state) => {
      switch (dataKey) {
        case CurrentParametersInputDataParams.TIGHTNESS:
          return state.data.tightness;
        case CurrentParametersInputDataParams.TUBE_CUTTING_QUALITY:
          return state.data.tube_cutting_quality;
        case CurrentParametersInputDataParams.EXTERNAL_THREAD_QUALITY:
          return state.data.external_thread_quality;
        default:
          break;
      }
    })
  );

  const booleanEntryModalProps: BooleanEntryModalProps = {
    id: id,
    title: title,
    open: open,
    dataKey: dataKey,
    data: data,
    setOpen: (val: boolean) => setOpen(val),
    changeData: (val: DataFormField) => changeData(val),
  };
  return <BooleanEntryModal {...booleanEntryModalProps} />;
}
