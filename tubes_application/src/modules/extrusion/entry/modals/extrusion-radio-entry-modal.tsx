import type { DataFormField } from "@/shared/helpers/data-form-field";
import { useShallow } from "zustand/shallow";
import { useExtrusionInputStore, ExtrusionInputParams } from "../../store/use-extrusion-input-current-parameters-store";
import { useExtrusionRadioEntryModalStore } from "../../store/use-extrusion-radio-entry-modal-store";
import type { RadioEntryModalProps } from "@/shared/components/modals/radio-entry-modal";
import RadioEntryModal from "@/shared/components/modals/radio-entry-modal";

export default function ExtrusionRadioEntryModal() {
  const id = useExtrusionRadioEntryModalStore(useShallow((state) => state.key));
  const title = useExtrusionRadioEntryModalStore(useShallow((state) => state.title));
  const open = useExtrusionRadioEntryModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionRadioEntryModalStore(useShallow((state) => state.setOpen));
  const dataKey = useExtrusionRadioEntryModalStore(useShallow((state) => state.key));
  const expectedValue = useExtrusionRadioEntryModalStore(useShallow((state) => state.expectedValue));
  const changeData = useExtrusionInputStore(useShallow((state) => state.changeData));

  const data = useExtrusionInputStore(
    useShallow((state) => {
      switch (dataKey) {
        case ExtrusionInputParams.RONDEL_TYPE:
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
    expectedValue: expectedValue,
    data: data,
    setOpen: (val: boolean) => setOpen(val),
    changeData: (val: DataFormField) => changeData(val),
  };
  return <RadioEntryModal {...radioEntryModalProps} />;
}
