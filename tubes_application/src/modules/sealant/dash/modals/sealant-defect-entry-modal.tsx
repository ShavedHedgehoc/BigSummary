import type { DefectInputModalProps } from "@/shared/components/modals/defect-input-modal";
import DefectInputModal from "@/shared/components/modals/defect-input-modal";
import { useSealantDefectInputModalStore } from "../../store/use-sealant-modal-store";
import { useShallow } from "zustand/shallow";
import { useSealantDefectStore } from "../../store/use-sealant-defect-store";

export default function SealantDefectEntryModal() {
  const open = useSealantDefectInputModalStore(useShallow((state) => state.open));
  const setOpen = useSealantDefectInputModalStore(useShallow((state) => state.setOpen));
  const data = useSealantDefectStore(useShallow((state) => state.data));
  const clearData = useSealantDefectStore(useShallow((state) => state.clearData));
  const roundData = useSealantDefectStore(useShallow((state) => state.roundData));
  const changeData = useSealantDefectStore(useShallow((state) => state.changeData));
  const sliceData = useSealantDefectStore(useShallow((state) => state.sliceData));

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
