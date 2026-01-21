import type { CloseSummaryModalProps } from "@/shared/components/modals/close-summary-modal";
import { PostNames } from "@/shared/helpers/post-names";
import CloseSummaryModal from "@/shared/components/modals/close-summary-modal";
import useVarnishCloseSummaryModal from "./use-varnish-close-summary-modal";

export default function VarnishCloseSummaryModal() {
  const { open, setOpen, data, clearData, handleAddButtonClick, handleEndButtonClick } = useVarnishCloseSummaryModal();
  const modalProps: CloseSummaryModalProps = {
    title: PostNames.VARNISH,
    open: open,
    defectValue: data,
    setOpen: (val: boolean) => setOpen(val),
    clearValue: () => clearData(),
    onAddButtonClick: () => handleAddButtonClick(),
    onEndButtonClick: () => handleEndButtonClick(),
  };

  return <CloseSummaryModal {...modalProps} />;
}
