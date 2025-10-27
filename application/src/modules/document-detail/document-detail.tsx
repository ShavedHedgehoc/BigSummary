import * as React from "react";
// import DocumentDetailFilter from "./filter/document-detail-filter";
// import DocumentDetailTable from "./document-detail-table";
// import DocumentDetailHeader from "./document-detail-header";
// import DocumentDetailDeleteRecordModal from "./delete-record-modal/document-detail-delete-record-modal";
// import DocumentDetailEditRecordModal from "./edit-record-modal/document-detail-edit-record-modal";
// import DocumentDetailHistoryModal from "./history-modal/document-detail-history-modal";
// import NoteModal from "../../shared/components/note-modal/note-modal";
// import DocumentDetailAddHistoryModal from "./add-history-modal/document-detail-add-history-modal";
// import DocumentDetailPDFModal from "./pdf-modal/document-detail-pdf-modal";

const DocumentDetailFilter = React.lazy(() => import("./filter/document-detail-filter"));
const DocumentDetailTable = React.lazy(() => import("./document-detail-table"));
const DocumentDetailHeader = React.lazy(() => import("./document-detail-header"));
const DocumentDetailDeleteRecordModal = React.lazy(
  () => import("./delete-record-modal/document-detail-delete-record-modal")
);
const DocumentDetailEditRecordModal = React.lazy(() => import("./edit-record-modal/document-detail-edit-record-modal"));
const DocumentDetailHistoryModal = React.lazy(() => import("./history-modal/document-detail-history-modal"));
const NoteModal = React.lazy(() => import("../../shared/components/note-modal/note-modal"));
const DocumentDetailAddHistoryModal = React.lazy(() => import("./add-history-modal/document-detail-add-history-modal"));
// const DocumentDetailPDFModal = React.lazy(() => import("./pdf-modal/document-detail-pdf-modal"));

export default function DocumentDetail() {
  return (
    <React.Fragment>
      <DocumentDetailHeader />
      <DocumentDetailFilter />
      <DocumentDetailTable />
      <DocumentDetailDeleteRecordModal />
      <DocumentDetailEditRecordModal />
      <DocumentDetailHistoryModal />
      <NoteModal />
      <DocumentDetailAddHistoryModal />
      {/* <DocumentDetailPDFModal /> */}
    </React.Fragment>
  );
}
