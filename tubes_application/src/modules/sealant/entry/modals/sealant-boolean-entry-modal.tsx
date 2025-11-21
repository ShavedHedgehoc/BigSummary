import BooleanEntryModal, { type BooleanEntryModalProps } from "@/shared/components/modals/boolean-entry-modal";
import type { DataFormField } from "@/shared/helpers/data-form-field";
import { useShallow } from "zustand/shallow";
import { useSealantBooleanEntryModalStore } from "../../store/use-sealant-boolean-entry-modal-store";

import { useSealantInputStore, SealantInputParams } from "../../store/use-sealant-input-store";

export default function SealantBooleanEntryModal() {
  const id = useSealantBooleanEntryModalStore(useShallow((state) => state.key));
  const title = useSealantBooleanEntryModalStore(useShallow((state) => state.title));
  const open = useSealantBooleanEntryModalStore(useShallow((state) => state.open));
  const setOpen = useSealantBooleanEntryModalStore(useShallow((state) => state.setOpen));
  const dataKey = useSealantBooleanEntryModalStore(useShallow((state) => state.key));
  const changeData = useSealantInputStore(useShallow((state) => state.changeData));

  const data = useSealantInputStore(
    useShallow((state) => {
      switch (dataKey) {
        case SealantInputParams.IS_CAP_SURFACE_SMOOTH:
          return state.data.is_cap_surface_smooth;
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
