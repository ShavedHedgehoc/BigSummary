import type { CloseSummaryModalProps } from "@/shared/components/modals/close-summary-modal";
import { PostNames } from "@/shared/helpers/post-names";
import CloseSummaryModal from "@/shared/components/modals/close-summary-modal";
import useSealantCloseSummaryModal from "./use-sealant-close-summary-modal";

export default function SealantCloseSummaryModal() {
  const { open, setOpen, data, clearData, handleAddButtonClick, handleEndButtonClick } = useSealantCloseSummaryModal();
  const modalProps: CloseSummaryModalProps = {
    title: PostNames.SEALANT,
    open: open,
    defectValue: data,
    setOpen: (val: boolean) => setOpen(val),
    clearValue: () => clearData(),
    onAddButtonClick: () => handleAddButtonClick(),
    onEndButtonClick: () => handleEndButtonClick(),
  };

  return <CloseSummaryModal {...modalProps} />;
}
