import BooleanEntryModal, { type BooleanEntryModalProps } from "@/shared/components/modals/boolean-entry-modal";
import type { DataFormField } from "@/shared/helpers/data-form-field";
import { useShallow } from "zustand/shallow";
import { useExtrusionInputStore, ExtrusionInputParams } from "../../store/use-extrusion-input-current-parameters-store";
import { useExtrusionBooleanEntryModalStore } from "../../store/use-extrusion-boolean-entry-modal-store";

export default function ExtrusionBooleanEntryModal() {
  const id = useExtrusionBooleanEntryModalStore(useShallow((state) => state.key));
  const title = useExtrusionBooleanEntryModalStore(useShallow((state) => state.title));
  const open = useExtrusionBooleanEntryModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionBooleanEntryModalStore(useShallow((state) => state.setOpen));
  const dataKey = useExtrusionBooleanEntryModalStore(useShallow((state) => state.key));
  const changeData = useExtrusionInputStore(useShallow((state) => state.changeData));

  const data = useExtrusionInputStore(
    useShallow((state) => {
      switch (dataKey) {
        case ExtrusionInputParams.TIGHTNESS:
          return state.data.tightness;
        case ExtrusionInputParams.TUBE_CUTTING_QUALITY:
          return state.data.tube_cutting_quality;
        case ExtrusionInputParams.EXTERNAL_THREAD_QUALITY:
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
