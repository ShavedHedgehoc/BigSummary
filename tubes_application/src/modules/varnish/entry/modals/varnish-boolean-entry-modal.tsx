import BooleanEntryModal, { type BooleanEntryModalProps } from "@/shared/components/modals/boolean-entry-modal";
import type { DataFormField } from "@/shared/helpers/data-form-field";
import { useShallow } from "zustand/shallow";
import { useVarnishBooleanEntryModalStore } from "../../store/use-varnish-boolean-entry-modal-store";

import { useVarnishInputStore, VarnishInputParams } from "../../store/use-varnish-input-store";

export default function VarnishBooleanEntryModal() {
  const id = useVarnishBooleanEntryModalStore(useShallow((state) => state.key));
  const title = useVarnishBooleanEntryModalStore(useShallow((state) => state.title));
  const open = useVarnishBooleanEntryModalStore(useShallow((state) => state.open));
  const setOpen = useVarnishBooleanEntryModalStore(useShallow((state) => state.setOpen));
  const dataKey = useVarnishBooleanEntryModalStore(useShallow((state) => state.key));
  const changeData = useVarnishInputStore(useShallow((state) => state.changeData));

  const data = useVarnishInputStore(
    useShallow((state) => {
      switch (dataKey) {
        case VarnishInputParams.INTERNAL_SECTIONAL_VIEW:
          return state.data.internal_sectional_view;
        case VarnishInputParams.ALUMINIUM_CLEARANCE_LACK:
          return state.data.aluminium_clearance_lack;
        case VarnishInputParams.UNPAINTING_LACK:
          return state.data.unpainting_lack;

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
