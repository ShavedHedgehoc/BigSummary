// import * as React from "react";
import { useShallow } from "zustand/react/shallow";
import { usePDFModalStore } from "../store/use-pdf-modal-store";
import ModalLayout from "../../../shared/layouts/modal-layout";
import DocumentDetailPDFView from "./document-detail-pdf-view";

// const ModalLayout = React.lazy(() => import("../../../shared/layouts/modal-layout"));
// const DocumentDetailPDFView = React.lazy(() => import("./document-detail-pdf-view"));

export default function DocumentDetailPDFModal() {
  const open = usePDFModalStore(useShallow((state) => state.open));
  const setRecord = usePDFModalStore(useShallow((state) => state.setRecord));
  const setOpen = usePDFModalStore(useShallow((state) => state.setOpen));

  function onClose() {
    setOpen(false);
    setRecord(null);
    setOpen(false);
  }

  const modalProps = {
    open: open,
    onClose: () => onClose(),
    title: "История статусов",
    height: 600,
    minHeight: 600,
    width: 800,
    onlyCloseButton: false,
  };

  const viewerHeight = modalProps.height;
  const viewerWidth = modalProps.width;

  return (
    <ModalLayout props={modalProps} buttons={<></>}>
      {/* <React.Suspense fallback={<div>...</div>}> */}
      <DocumentDetailPDFView viewerHeight={viewerHeight} viewerWidth={viewerWidth} />
      {/* </React.Suspense> */}
    </ModalLayout>
  );
}
