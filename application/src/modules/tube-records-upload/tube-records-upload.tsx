import * as React from "react";
import TubeRecordsUploadHeader from "./tube-records-upload-header";
import TubeRecordsUploadForm from "./tube-records-upload-form";
import TubeRecordsUploadStepper from "./tube-records-upload-stepper";
import TubeRecordsUploadErrsModal from "./tube-records-upload-errs-modal";

export default function TubeRecordsUpload() {
  return (
    <React.Fragment>
      <TubeRecordsUploadHeader />
      <TubeRecordsUploadForm />
      <TubeRecordsUploadStepper />
      <TubeRecordsUploadErrsModal />
    </React.Fragment>
  );
}
