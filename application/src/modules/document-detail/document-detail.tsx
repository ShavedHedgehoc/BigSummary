import * as React from "react";
import DocumentDetailFilter from "./document-detail-filter";
import DocumentDetailTable from "./document-detail-table";
import DocumentDetailHeader from "./document-detail-header";
import DocumentDetailDeleteRecordModal from "./document-detail-delete-record-modal";
import DocumentDetailEditRecordModal from "./document-detail-edit-record-modal";

export default function DocumentDetail() {
  return (
    <React.Fragment>
      <DocumentDetailHeader />
      <DocumentDetailFilter />
      <DocumentDetailTable />
      <DocumentDetailDeleteRecordModal />
      <DocumentDetailEditRecordModal />
    </React.Fragment>
  );
}
