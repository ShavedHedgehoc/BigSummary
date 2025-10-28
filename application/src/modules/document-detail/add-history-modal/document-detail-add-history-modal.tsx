import ModalLayout from "../../../shared/layouts/modal-layout";
import { useShallow } from "zustand/react/shallow";

import DocumentDetailAddHistoryModalStateSelector from "./document-detail-add-history-state-selector";
import { useDocumentDetailAddHistoryModalStore } from "../store/use-document-detail-add-history-modal-store";
import DocumentDetailAddHistoryInfo from "./document-detail-add-history-modal-info";
import DocumentDetailAddHistoryModalButtons from "./document-detail-add-history-modal-buttons";
import DocumentDetailAddHistoryModalNote from "./document-detail-add-history-modal-note";

export default function DocumentDetailAddHistoryModal() {
  const open = useDocumentDetailAddHistoryModalStore(useShallow((state) => state.open));
  // const title = useDocumentDetailAddHistoryModalStore(useShallow((state) => state.title));
  const setOpen = useDocumentDetailAddHistoryModalStore(useShallow((state) => state.setOpen));

  const modalProps = {
    open: open,
    onClose: () => setOpen(false),
    title: "Добавление записи",
    height: 400,
    minHeight: 400,
    width: 600,
    onlyCloseButton: false,
  };

  return (
    <ModalLayout props={modalProps} buttons={<DocumentDetailAddHistoryModalButtons />}>
      <DocumentDetailAddHistoryInfo />
      <DocumentDetailAddHistoryModalStateSelector />
      <DocumentDetailAddHistoryModalNote />
    </ModalLayout>
  );
}
