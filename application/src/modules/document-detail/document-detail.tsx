import * as React from "react";
import DocumentDetailFilter from "./document-detail-filter";
import DocumentDetailTable from "./document-detail-table";
import DocumentDetailHeader from "./document-detail-header";

export default function DocumentDetail() {
  return (
    <React.Fragment>
      <DocumentDetailHeader />

      <DocumentDetailFilter />
      <DocumentDetailTable />
    </React.Fragment>
  );
}
