import * as React from "react";
import DocsUploadHeader from "./docs-upload-header";
import DocsUploadForm from "./docs-upload-form";
import DocsUploadStepper from "./docs-upload-stepper";
import DocsUploadErrsModal from "./docs-upload-errs-modal";

export default function DocsUpload() {
  return (
    <React.Fragment>
      <DocsUploadHeader />
      <DocsUploadForm />
      <DocsUploadStepper />
      <DocsUploadErrsModal />
    </React.Fragment>
  );
}
