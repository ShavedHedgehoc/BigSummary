import * as React from "react";
import BasesUploadHeader from "./bases-upload-header";
import BasesUploadForm from "./bases-upload-form";
import BasesUploadStepper from "./bases-upload-stepper";
import BasesUploadErrsModal from "./bases-upload-errs-modal";
export default function BasesUpload() {
  return (
    <React.Fragment>
      <BasesUploadHeader />
      <BasesUploadForm />
      <BasesUploadStepper />
      <BasesUploadErrsModal />
    </React.Fragment>
  );
}
