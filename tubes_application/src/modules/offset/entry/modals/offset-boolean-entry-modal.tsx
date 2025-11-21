import BooleanEntryModal, { type BooleanEntryModalProps } from "@/shared/components/modals/boolean-entry-modal";
import type { DataFormField } from "@/shared/helpers/data-form-field";
import { useShallow } from "zustand/shallow";
import { useOffsetBooleanEntryModalStore } from "../../store/use-offset-boolean-entry-modal-store";
import { OffsetInputParams, useOffsetInputStore } from "../../store/use-offset-input-store";

export default function OffsetBooleanEntryModal() {
  const id = useOffsetBooleanEntryModalStore(useShallow((state) => state.key));
  const title = useOffsetBooleanEntryModalStore(useShallow((state) => state.title));
  const open = useOffsetBooleanEntryModalStore(useShallow((state) => state.open));
  const setOpen = useOffsetBooleanEntryModalStore(useShallow((state) => state.setOpen));
  const dataKey = useOffsetBooleanEntryModalStore(useShallow((state) => state.key));
  const changeData = useOffsetInputStore(useShallow((state) => state.changeData));

  const data = useOffsetInputStore(
    useShallow((state) => {
      switch (dataKey) {
        case OffsetInputParams.DESIGN_MATCH:
          return state.data.design_match;
        case OffsetInputParams.TUBE_APPEARANCE:
          return state.data.tube_apperarance;
        case OffsetInputParams.TUBE_EDGE_DEFORMATION_LACK:
          return state.data.tube_edge_deformation_lack;
        case OffsetInputParams.ALUMINIUM_CLEARANCE_LACK:
          return state.data.aluminium_clearance_lack;
        case OffsetInputParams.DRIPS_LACK:
          return state.data.drips_lack;
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
