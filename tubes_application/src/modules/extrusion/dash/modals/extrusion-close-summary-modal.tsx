import type { CloseSummaryModalProps } from "@/shared/components/modals/close-summary-modal";
import { PostNames } from "@/shared/helpers/post-names";
import CloseSummaryModal from "@/shared/components/modals/close-summary-modal";
import useExtrusionCloseSummaryModal from "./use-extrusion-close-summary-modal";

export default function ExtrusionCloseSummaryModal() {
  const { open, setOpen, data, clearData, handleAddButtonClick, handleEndButtonClick } =
    useExtrusionCloseSummaryModal();
  const modalProps: CloseSummaryModalProps = {
    title: PostNames.EXTRUSION,
    open: open,
    defectValue: data,
    setOpen: (val: boolean) => setOpen(val),
    clearValue: () => clearData(),
    onAddButtonClick: () => handleAddButtonClick(),
    onEndButtonClick: () => handleEndButtonClick(),
  };

  return <CloseSummaryModal {...modalProps} />;
}
