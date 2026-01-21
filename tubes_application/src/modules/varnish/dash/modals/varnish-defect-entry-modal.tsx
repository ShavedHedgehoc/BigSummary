import type { DefectInputModalProps } from "@/shared/components/modals/defect-input-modal";
import DefectInputModal from "@/shared/components/modals/defect-input-modal";
import { useVarnishDefectInputModalStore } from "../../store/use-varnish-modal-store";
import { useShallow } from "zustand/shallow";
import { useVarnishDefectStore } from "../../store/use-varnish-defect-store";

export default function VarnishDefectEntryModal() {
  const open = useVarnishDefectInputModalStore(useShallow((state) => state.open));
  const setOpen = useVarnishDefectInputModalStore(useShallow((state) => state.setOpen));
  const data = useVarnishDefectStore(useShallow((state) => state.data));
  const clearData = useVarnishDefectStore(useShallow((state) => state.clearData));
  const roundData = useVarnishDefectStore(useShallow((state) => state.roundData));
  const changeData = useVarnishDefectStore(useShallow((state) => state.changeData));
  const sliceData = useVarnishDefectStore(useShallow((state) => state.sliceData));

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
