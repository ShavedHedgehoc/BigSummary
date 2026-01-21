import type { CloseSummaryModalProps } from "@/shared/components/modals/close-summary-modal";
import { PostNames } from "@/shared/helpers/post-names";
import CloseSummaryModal from "@/shared/components/modals/close-summary-modal";
import useOffsetCloseSummaryModal from "./use-offset-close-summary-modal";

export default function OffsetCloseSummaryModal() {
  const { open, setOpen, data, clearData, handleAddButtonClick, handleEndButtonClick } = useOffsetCloseSummaryModal();
  const modalProps: CloseSummaryModalProps = {
    title: PostNames.OFFSET,
    open: open,
    defectValue: data,
    setOpen: (val: boolean) => setOpen(val),
    clearValue: () => clearData(),
    onAddButtonClick: () => handleAddButtonClick(),
    onEndButtonClick: () => handleEndButtonClick(),
  };

  return <CloseSummaryModal {...modalProps} />;
}
