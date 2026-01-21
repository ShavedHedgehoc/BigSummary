import type { DefectInputModalProps } from "@/shared/components/modals/defect-input-modal";
import DefectInputModal from "@/shared/components/modals/defect-input-modal";
import { useExtrusionDefectInputModalStore } from "../../store/use-extrusion-modal-store";
import { useShallow } from "zustand/shallow";
import { useExtrusionDefectStore } from "../../store/use-extrusion-defect-store";

export default function ExtrusionDefectEntryModal() {
  const open = useExtrusionDefectInputModalStore(useShallow((state) => state.open));
  const setOpen = useExtrusionDefectInputModalStore(useShallow((state) => state.setOpen));
  const data = useExtrusionDefectStore(useShallow((state) => state.data));
  const clearData = useExtrusionDefectStore(useShallow((state) => state.clearData));
  const roundData = useExtrusionDefectStore(useShallow((state) => state.roundData));
  const changeData = useExtrusionDefectStore(useShallow((state) => state.changeData));
  const sliceData = useExtrusionDefectStore(useShallow((state) => state.sliceData));

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
