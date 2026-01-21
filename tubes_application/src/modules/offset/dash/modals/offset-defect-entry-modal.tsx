import type { DefectInputModalProps } from "@/shared/components/modals/defect-input-modal";
import DefectInputModal from "@/shared/components/modals/defect-input-modal";
import { useOffsetDefectInputModalStore } from "../../store/use-offset-modal-store";
import { useShallow } from "zustand/shallow";
import { useOffsetDefectStore } from "../../store/use-offset-defect-store";

export default function OffsetDefectEntryModal() {
  const open = useOffsetDefectInputModalStore(useShallow((state) => state.open));
  const setOpen = useOffsetDefectInputModalStore(useShallow((state) => state.setOpen));
  const data = useOffsetDefectStore(useShallow((state) => state.data));
  const clearData = useOffsetDefectStore(useShallow((state) => state.clearData));
  const roundData = useOffsetDefectStore(useShallow((state) => state.roundData));
  const changeData = useOffsetDefectStore(useShallow((state) => state.changeData));
  const sliceData = useOffsetDefectStore(useShallow((state) => state.sliceData));

  const modalProps: DefectInputModalProps = {
    open: open,
    data: data,
    setOpen: setOpen,
    clearData: clearData,
    changeData: changeData,
    sliceData: sliceData,
    roundData: roundData,
  };

  return <DefectInputModal {...modalProps} />;
}
